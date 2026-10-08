<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\StorePropertyRequest;
use App\Http\Requests\Property\UpdatePropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Mail\PropertyStatusChangedMail;
use App\Models\Favorite;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::query()->with(['owner', 'images'])
            ->withCount('favorites');

        if ($search = $request->string('search')->toString()) {
            $query->where(function ($builder) use ($search): void {
                $builder->where('title', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            });
        }

        $query->when($request->filled('location'), fn ($builder) => $builder->where('location', 'like', '%'.$request->string('location').'%'));
        $query->when($request->filled('property_type'), fn ($builder) => $builder->where('property_type', $request->string('property_type')));
        $query->when($request->filled('transaction_type'), fn ($builder) => $builder->where('transaction_type', $request->string('transaction_type')));
        $query->when($request->filled('bedrooms'), fn ($builder) => $builder->where('bedrooms', $request->integer('bedrooms')));
        $query->when($request->filled('min_price'), fn ($builder) => $builder->where('price', '>=', $request->numeric('min_price')));
        $query->when($request->filled('max_price'), fn ($builder) => $builder->where('price', '<=', $request->numeric('max_price')));

        return PropertyResource::collection(
            $query->latest()->paginate($request->integer('per_page', 12))->withQueryString()
        );
    }

    public function show(Property $property): PropertyResource
    {
        return new PropertyResource($property->load(['owner', 'images'])->loadCount('favorites'));
    }

    public function store(StorePropertyRequest $request): PropertyResource
    {
        $property = DB::transaction(function () use ($request) {
            $property = Property::query()->create([
                ...$request->validated(),
                'user_id' => $request->user()->id,
            ]);

            $this->storeImages($property, $request->file('images', []));

            return $property;
        });

        return new PropertyResource($property->load(['owner', 'images'])->loadCount('favorites'));
    }

    public function update(UpdatePropertyRequest $request, Property $property): PropertyResource
    {
        $previousStatus = $property->status;

        DB::transaction(function () use ($request, $property) {
            $property->update($request->validated());

            if ($request->hasFile('images')) {
                $this->storeImages($property, $request->file('images', []));
            }
        });

        $property->load(['owner', 'images', 'favorites.user'])->loadCount('favorites');

        if ($previousStatus !== $property->status) {
            $this->notifyStatusChange($property, $previousStatus);
        }

        return new PropertyResource($property);
    }

    public function destroy(Property $property): JsonResponse
    {
        $property->load('images');

        foreach ($property->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $property->delete();

        return response()->json(['message' => 'Property deleted successfully.']);
    }

    private function storeImages(Property $property, array $images): void
    {
        foreach ($images as $index => $image) {
            $path = $image->store('properties', 'public');

            PropertyImage::query()->create([
                'property_id' => $property->id,
                'path' => $path,
                'is_primary' => $index === 0 && ! $property->images()->exists(),
                'sort_order' => $index,
            ]);
        }
    }

    private function notifyStatusChange(Property $property, string $previousStatus): void
    {
        $property->loadMissing(['owner', 'favorites.user']);

        if ($property->owner) {
            Mail::to($property->owner->email)->send(new PropertyStatusChangedMail($property, $previousStatus));
        }

        $property->favorites
            ->pluck('user')
            ->filter()
            ->unique('email')
            ->each(fn (User $user) => Mail::to($user->email)->send(new PropertyStatusChangedMail($property, $previousStatus)));
    }
}
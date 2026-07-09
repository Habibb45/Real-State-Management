<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PropertyResource;
use App\Models\Favorite;
use App\Models\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $favorites = $request->user()
            ->favorites()
            ->with(['property.owner', 'property.images'])
            ->latest()
            ->get()
            ->pluck('property')
            ->filter();

        return PropertyResource::collection($favorites);
    }

    public function toggle(Request $request, Property $property): JsonResponse
    {
        $favorite = Favorite::query()->where('user_id', $request->user()->id)
            ->where('property_id', $property->id)
            ->first();

        if ($favorite) {
            $favorite->delete();

            return response()->json(['favorited' => false, 'message' => 'Property removed from favorites.']);
        }

        Favorite::query()->create([
            'user_id' => $request->user()->id,
            'property_id' => $property->id,
        ]);

        return response()->json(['favorited' => true, 'message' => 'Property added to favorites.']);
    }
}
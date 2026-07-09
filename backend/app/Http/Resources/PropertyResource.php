<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $currentUser = $request->user();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => (float) $this->price,
            'location' => $this->location,
            'address' => $this->address,
            'property_type' => $this->property_type,
            'transaction_type' => $this->transaction_type,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'area' => (float) $this->area,
            'status' => $this->status,
            'created_at' => $this->created_at?->toISOString(),
            'owner' => $this->whenLoaded('owner', fn () => [
                'id' => $this->owner->id,
                'name' => $this->owner->name,
                'email' => $this->owner->email,
                'phone' => $this->owner->phone,
            ]),
            'images' => $this->whenLoaded('images', fn () => $this->images->map(fn ($image) => [
                'id' => $image->id,
                'path' => $image->path,
                'url' => $image->url,
                'is_primary' => $image->is_primary,
            ])),
            'favorites_count' => $this->favorites_count ?? $this->favorites()->count(),
            'is_favorited' => $currentUser ? $this->favorites()->where('user_id', $currentUser->id)->exists() : false,
        ];
    }
}
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role,
            'properties_count' => $this->properties_count ?? $this->properties()->count(),
            'favorites_count' => $this->favorites_count ?? $this->favorites()->count(),
            'contacts_count' => $this->contacts_count ?? $this->contacts()->count(),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\StoreContactRequest;
use App\Mail\PropertyContactMail;
use App\Models\Contact;
use App\Models\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request): JsonResponse
    {
        $property = Property::query()->with('owner')->findOrFail($request->integer('property_id'));

        $contact = Contact::query()->create([
            ...$request->validated(),
            'user_id' => $request->user()?->id,
        ]);

        if ($property->owner) {
            Mail::to($property->owner->email)->send(new PropertyContactMail($contact, $property));
        }

        return response()->json([
            'message' => 'Your message has been sent to the property owner.',
            'contact' => $contact,
        ], 201);
    }
}
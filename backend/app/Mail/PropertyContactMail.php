<?php

namespace App\Mail;

use App\Models\Contact;
use App\Models\Property;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PropertyContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Contact $contact, public Property $property)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'New enquiry for '.$this->property->title);
    }

    public function content(): Content
    {
        return new Content(view: 'emails.property-contact', with: [
            'contact' => $this->contact,
            'property' => $this->property,
        ]);
    }
}
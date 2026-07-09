<?php

namespace App\Mail;

use App\Models\Property;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PropertyStatusChangedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Property $property, public string $previousStatus)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Property status updated: '.$this->property->title);
    }

    public function content(): Content
    {
        return new Content(view: 'emails.property-status-changed', with: [
            'property' => $this->property,
            'previousStatus' => $this->previousStatus,
        ]);
    }
}
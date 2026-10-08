<h1>New property enquiry</h1>
<p><strong>Property:</strong> {{ $property->title }}</p>
<p><strong>From:</strong> {{ $contact->name }} ({{ $contact->email }})</p>
<p><strong>Message:</strong></p>
<p>{{ $contact->message }}</p>
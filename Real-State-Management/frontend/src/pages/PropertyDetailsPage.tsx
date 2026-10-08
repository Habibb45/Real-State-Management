import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contactsApi, favoritesApi, propertyApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import type { ApiProperty } from "../types";

export function PropertyDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState<ApiProperty | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    void propertyApi
      .get(Number(id))
      .then((response) => setProperty(response.data));
  }, [id]);

  const handleContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!property) return;

    setBusy(true);
    try {
      await contactsApi.create({
        property_id: property.id,
        name: user?.name ?? "Guest visitor",
        email: user?.email ?? "guest@example.com",
        message,
      });
      setMessage("");
    } finally {
      setBusy(false);
    }
  };

  if (!property) {
    return (
      <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-glow">
        Loading property details...
      </div>
    );
  }

  const image =
    property.images?.find((item) => item.is_primary) ?? property.images?.[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/85 shadow-glow">
        {image ? (
          <img
            src={image.url}
            alt={property.title}
            className="h-96 w-full object-cover"
          />
        ) : (
          <div className="h-96 bg-[linear-gradient(135deg,#1f6f5b,#0f172a)]" />
        )}
        <div className="space-y-5 p-8">
          <div>
            <h1 className="text-4xl font-black text-ink">{property.title}</h1>
            <p className="mt-2 text-slateSoft">
              {property.location} · {property.address}
            </p>
          </div>
          <p className="leading-8 text-slateSoft">{property.description}</p>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Detail
              label="Price"
              value={`$${property.price.toLocaleString()}`}
            />
            <Detail label="Type" value={property.property_type} />
            <Detail label="Bedrooms" value={String(property.bedrooms ?? 0)} />
            <Detail label="Status" value={property.status} />
          </div>
          <button
            onClick={() => void favoritesApi.toggle(property.id)}
            className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-moss"
          >
            Save favorite
          </button>
        </div>
      </section>

      <aside className="rounded-[2.5rem] border border-white/70 bg-white/85 p-8 shadow-glow">
        <h2 className="text-2xl font-black text-ink">Contact owner</h2>
        <form className="mt-6 space-y-4" onSubmit={handleContact}>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-44 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-moss"
            placeholder="Tell the owner what you are looking for..."
          />
          <button
            disabled={busy}
            className="w-full rounded-full bg-moss px-5 py-3 text-sm font-bold text-white transition hover:bg-ink disabled:opacity-60"
          >
            {busy ? "Sending..." : "Send enquiry"}
          </button>
        </form>
      </aside>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-sand p-4">
      <div className="text-xs font-bold uppercase tracking-[0.3em] text-slateSoft">
        {label}
      </div>
      <div className="mt-2 text-sm font-bold text-ink">{value}</div>
    </div>
  );
}

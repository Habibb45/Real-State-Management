import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  contactsApi,
  favoritesApi,
  getApiErrorMessage,
  propertyApi,
} from "../lib/api";
import { useAuth } from "../context/AuthContext";
import type { ApiProperty } from "../types";

export function PropertyDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState<ApiProperty | null>(null);
  const [message, setMessage] = useState("");
  const [contactBusy, setContactBusy] = useState(false);
  const [favoriteBusy, setFavoriteBusy] = useState(false);
  const [contactNotice, setContactNotice] = useState("");
  const [contactError, setContactError] = useState("");
  const [favoriteNotice, setFavoriteNotice] = useState("");
  const [favoriteError, setFavoriteError] = useState("");

  useEffect(() => {
    if (!id) return;
    void propertyApi
      .get(Number(id))
      .then((response) => setProperty(response.data));
  }, [id]);

  const handleContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!property) return;

    setContactBusy(true);
    setContactNotice("");
    setContactError("");
    try {
      await contactsApi.create({
        property_id: property.id,
        name: user?.name ?? "Guest visitor",
        email: user?.email ?? "guest@example.com",
        message,
      });
      setMessage("");
      setContactNotice("Your enquiry has been sent to the property owner.");
    } catch (error) {
      setContactError(
        getApiErrorMessage(error, "Unable to send your enquiry. Please try again."),
      );
    } finally {
      setContactBusy(false);
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!property) return;

    setFavoriteBusy(true);
    setFavoriteNotice("");
    setFavoriteError("");
    try {
      const response = await favoritesApi.toggle(property.id);
      setProperty({ ...property, is_favorited: response.favorited });
      setFavoriteNotice(response.message);
    } catch (error) {
      setFavoriteError(
        getApiErrorMessage(error, "Unable to update favorites. Please try again."),
      );
    } finally {
      setFavoriteBusy(false);
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
            type="button"
            onClick={() => void handleFavorite()}
            disabled={favoriteBusy}
            className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-moss disabled:opacity-60"
          >
            {favoriteBusy
              ? "Please wait..."
              : property.is_favorited
                ? "Remove from favorites"
                : user
                  ? "Save favorite"
                  : "Sign in to save"}
          </button>
          {favoriteNotice && (
            <p className="mt-3 text-sm font-medium text-green-700" role="status">
              {favoriteNotice}
            </p>
          )}
          {favoriteError && (
            <p className="mt-3 text-sm font-medium text-red-700" role="alert">
              {favoriteError}
            </p>
          )}
        </div>
      </section>

      <aside className="rounded-[2.5rem] border border-white/70 bg-white/85 p-8 shadow-glow">
        <h2 className="text-2xl font-black text-ink">Contact owner</h2>
        <form className="mt-6 space-y-4" onSubmit={handleContact}>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            className="min-h-44 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-moss"
            placeholder="Tell the owner what you are looking for..."
          />
          <button
            disabled={contactBusy}
            className="w-full rounded-full bg-moss px-5 py-3 text-sm font-bold text-white transition hover:bg-ink disabled:opacity-60"
          >
            {contactBusy ? "Sending..." : "Send enquiry"}
          </button>
          {contactNotice && (
            <p className="text-sm font-medium text-green-700" role="status">
              {contactNotice}
            </p>
          )}
          {contactError && (
            <p className="text-sm font-medium text-red-700" role="alert">
              {contactError}
            </p>
          )}
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

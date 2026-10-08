import { Link } from "react-router-dom";
import type { ApiProperty } from "../types";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function PropertyCard({ property }: { property: ApiProperty }) {
  const image =
    property.images?.find((item) => item.is_primary) ?? property.images?.[0];

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-glow transition hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden bg-ink">
        {image ? (
          <img
            src={image.url}
            alt={property.title}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-end bg-[linear-gradient(135deg,#1f6f5b,#0f172a)] p-5 text-white">
            <span className="text-sm font-semibold uppercase tracking-[0.35em]">
              Featured property
            </span>
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-ink">
          {property.transaction_type}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-ink">{property.title}</h3>
            <p className="mt-1 text-sm text-slateSoft">{property.location}</p>
          </div>
          <div className="text-right text-lg font-black text-moss">
            {moneyFormatter.format(property.price)}
          </div>
        </div>
        <p className="max-h-16 overflow-hidden text-sm leading-6 text-slateSoft">
          {property.description}
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-ink/80">
          <span className="rounded-full bg-sand px-3 py-1">
            {property.property_type}
          </span>
          <span className="rounded-full bg-sand px-3 py-1">
            {property.bedrooms ?? 0} beds
          </span>
          <span className="rounded-full bg-sand px-3 py-1">
            {property.bathrooms ?? 0} baths
          </span>
          <span className="rounded-full bg-sand px-3 py-1">
            {property.status}
          </span>
        </div>
        <Link
          to={`/properties/${property.id}`}
          className="inline-flex w-full items-center justify-center rounded-full bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-moss"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

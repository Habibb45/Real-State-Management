import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { propertyApi } from "../lib/api";
import type { ApiProperty } from "../types";
import { PropertyCard } from "../components/PropertyCard";
import { SectionHeading } from "../components/SectionHeading";
import { StatCard } from "../components/StatCard";

export function HomePage() {
  const [featured, setFeatured] = useState<ApiProperty[]>([]);

  useEffect(() => {
    void propertyApi.list({}).then((response) => {
      const items = Array.isArray(response.data)
        ? response.data
        : (response.data?.data ?? []);
      setFeatured(items.slice(0, 6));
    });
  }, []);

  return (
    <div className="space-y-16">
      <section className="grid gap-8 rounded-[2.5rem] border border-white/70 bg-white/75 p-8 shadow-glow backdrop-blur lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-sand px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-moss">
            Production-style portfolio project
          </span>
          <h1 className="max-w-3xl text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">
            Manage, market, and monitor every property from one polished
            platform.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slateSoft">
            Browse listings, save favorites, contact owners, and give admins the
            dashboard they need to manage a real estate business with
            confidence.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/properties"
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-moss"
            >
              Browse properties
            </Link>
            <Link
              to="/auth"
              className="rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-moss hover:text-moss"
            >
              Sign in
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          <StatCard
            label="Total listings"
            value="1,284"
            hint="Properties already organized for rent and sale"
          />
          <StatCard
            label="Active users"
            value="12.6k"
            hint="Normal users and administrators in one platform"
          />
          <StatCard
            label="Response rate"
            value="98%"
            hint="Contact requests tracked from enquiry to resolution"
          />
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Featured inventory"
          title="Curated properties with a clean, high-trust presentation"
          description="The frontend is built to look like a product that can be demoed in an interview: sharp cards, useful search, clear actions, and a dashboard-ready layout."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}

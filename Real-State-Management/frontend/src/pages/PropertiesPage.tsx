import { useEffect, useState } from "react";
import { propertyApi } from "../lib/api";
import type { ApiProperty, PropertyFilters } from "../types";
import { PropertyCard } from "../components/PropertyCard";
import { SearchFilters } from "../components/SearchFilters";
import { SectionHeading } from "../components/SectionHeading";

export function PropertiesPage() {
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [properties, setProperties] = useState<ApiProperty[]>([]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      void propertyApi.list(filters).then((response) => {
        const items = Array.isArray(response.data)
          ? response.data
          : (response.data?.data ?? []);
        setProperties(items);
      });
    }, 250);

    return () => window.clearTimeout(handle);
  }, [filters]);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Inventory"
        title="Search and filter property inventory"
        description="Location, type, transaction mode, bedroom count, and price range are all wired into the API contract."
      />
      <SearchFilters value={filters} onChange={setFilters} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

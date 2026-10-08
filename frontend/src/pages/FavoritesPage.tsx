import { useCallback, useEffect, useState } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { favoritesApi, getApiErrorMessage } from "../lib/api";
import type { ApiProperty } from "../types";

export function FavoritesPage() {
  const [properties, setProperties] = useState<ApiProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await favoritesApi.list();
      setProperties(response.data ?? []);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to load your favorites. Please try again.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFavorites();
  }, [loadFavorites]);

  const removeFavorite = async (propertyId: number) => {
    setError("");
    try {
      await favoritesApi.toggle(propertyId);
      setProperties((current) =>
        current.filter((property) => property.id !== propertyId),
      );
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Unable to remove this property from your favorites.",
        ),
      );
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black text-ink">Favorite properties</h1>
      {error && (
        <p className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      )}
      {loading ? (
        <p className="text-slateSoft">Loading your favorites...</p>
      ) : properties.length === 0 ? (
        <p className="rounded-[2rem] border border-white/70 bg-white/85 p-8 text-slateSoft shadow-glow">
          You have not saved any properties yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onRemoveFavorite={(propertyId) => void removeFavorite(propertyId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

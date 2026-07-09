import type { PropertyFilters } from "../types";

interface Props {
  value: PropertyFilters;
  onChange: (next: PropertyFilters) => void;
}

export function SearchFilters({ value, onChange }: Props) {
  return (
    <div className="grid gap-4 rounded-[2rem] border border-white/60 bg-white/80 p-5 shadow-glow backdrop-blur md:grid-cols-2 xl:grid-cols-6">
      <input
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-moss"
        placeholder="Search by title or location"
        value={value.search ?? ""}
        onChange={(event) => onChange({ ...value, search: event.target.value })}
      />
      <input
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-moss"
        placeholder="Location"
        value={value.location ?? ""}
        onChange={(event) =>
          onChange({ ...value, location: event.target.value })
        }
      />
      <select
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-moss"
        value={value.property_type ?? ""}
        onChange={(event) =>
          onChange({
            ...value,
            property_type: event.target
              .value as PropertyFilters["property_type"],
          })
        }
      >
        <option value="">Property type</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Villa">Villa</option>
        <option value="Office">Office</option>
      </select>
      <select
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-moss"
        value={value.transaction_type ?? ""}
        onChange={(event) =>
          onChange({
            ...value,
            transaction_type: event.target
              .value as PropertyFilters["transaction_type"],
          })
        }
      >
        <option value="">Transaction</option>
        <option value="Rent">Rent</option>
        <option value="Sale">Sale</option>
      </select>
      <input
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-moss"
        placeholder="Min price"
        value={value.min_price ?? ""}
        onChange={(event) =>
          onChange({ ...value, min_price: event.target.value })
        }
      />
      <input
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-moss"
        placeholder="Max price"
        value={value.max_price ?? ""}
        onChange={(event) =>
          onChange({ ...value, max_price: event.target.value })
        }
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { dashboardApi } from "../../lib/api";
import type { DashboardPayload } from "../../types";
import { StatCard } from "../../components/StatCard";
import { BarChart } from "../../components/BarChart";

export function AdminDashboardPage() {
  const [data, setData] = useState<DashboardPayload | null>(null);

  useEffect(() => {
    void dashboardApi.get().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-glow">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total properties"
          value={String(data.stats.total_properties)}
          hint="All listings in the system"
        />
        <StatCard
          label="Total users"
          value={String(data.stats.total_users)}
          hint="Registered user accounts"
        />
        <StatCard
          label="Available properties"
          value={String(data.stats.available_properties)}
          hint="Still open for deals"
        />
        <StatCard
          label="Sold / rented"
          value={String(data.stats.sold_or_rented_properties)}
          hint="Closed or occupied listings"
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <BarChart
          title="Properties by category"
          data={data.charts.property_categories.map((entry) => ({
            label: entry.property_type,
            value: entry.total,
          }))}
        />
        <BarChart
          title="Monthly registrations"
          data={data.charts.monthly_registrations.map((entry) => ({
            label: entry.month,
            value: entry.total,
          }))}
        />
      </div>
    </div>
  );
}

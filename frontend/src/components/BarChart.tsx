export function BarChart({
  title,
  data,
}: {
  title: string;
  data: Array<{ label: string; value: number }>;
}) {
  const maxValue = Math.max(...data.map((entry) => entry.value), 1);

  return (
    <div className="rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-glow backdrop-blur">
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <div className="mt-6 space-y-4">
        {data.map((entry) => (
          <div key={entry.label}>
            <div className="mb-2 flex items-center justify-between text-sm text-slateSoft">
              <span>{entry.label}</span>
              <span>{entry.value}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-sand">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#1f6f5b,#c47f4a)]"
                style={{ width: `${(entry.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

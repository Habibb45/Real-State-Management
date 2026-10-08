export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-glow backdrop-blur">
      <div className="text-xs font-bold uppercase tracking-[0.32em] text-slateSoft">
        {label}
      </div>
      <div className="mt-3 text-3xl font-black text-ink">{value}</div>
      <div className="mt-2 text-sm text-slateSoft">{hint}</div>
    </div>
  );
}

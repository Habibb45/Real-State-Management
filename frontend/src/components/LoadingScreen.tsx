export function LoadingScreen({
  label = "Loading the experience...",
}: {
  label?: string;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-3xl border border-white/50 bg-white/70 px-6 py-4 shadow-glow backdrop-blur">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slateSoft">
          Real Estate Management
        </div>
        <div className="mt-2 text-lg font-bold text-ink">{label}</div>
      </div>
    </div>
  );
}

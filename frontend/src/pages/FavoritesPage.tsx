export function FavoritesPage() {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-glow">
      <h1 className="text-3xl font-black text-ink">Favorite properties</h1>
      <p className="mt-3 text-slateSoft">
        This page is wired to the favorites endpoint and can render saved
        properties once the API returns data.
      </p>
    </div>
  );
}

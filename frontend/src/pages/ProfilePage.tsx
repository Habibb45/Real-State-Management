import { useAuth } from "../context/AuthContext";

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-glow">
        <div className="text-xs font-bold uppercase tracking-[0.35em] text-moss">
          Profile
        </div>
        <h1 className="mt-3 text-4xl font-black text-ink">{user.name}</h1>
        <div className="mt-6 space-y-3 text-slateSoft">
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone ?? "Not provided"}</p>
          <p>Role: {user.role}</p>
        </div>
      </section>
      <section className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-glow">
        <h2 className="text-2xl font-black text-ink">Activity summary</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Metric label="Properties" value={user.properties_count ?? 0} />
          <Metric label="Favorites" value={user.favorites_count ?? 0} />
          <Metric label="Contacts" value={user.contacts_count ?? 0} />
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-sand p-5">
      <div className="text-xs font-bold uppercase tracking-[0.3em] text-slateSoft">
        {label}
      </div>
      <div className="mt-2 text-3xl font-black text-ink">{value}</div>
    </div>
  );
}

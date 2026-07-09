import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);

    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
      navigate("/");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-white/70 bg-white/85 p-8 shadow-glow backdrop-blur">
      <div className="flex gap-2 rounded-full bg-sand p-1 text-sm font-bold">
        <button
          type="button"
          className={`flex-1 rounded-full px-4 py-2 ${mode === "login" ? "bg-ink text-white" : "text-ink/70"}`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={`flex-1 rounded-full px-4 py-2 ${mode === "register" ? "bg-ink text-white" : "text-ink/70"}`}
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>
      <form className="mt-8 space-y-4" onSubmit={submit}>
        {mode === "register" && (
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        )}
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="Email address"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        {mode === "register" && (
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Phone"
            value={form.phone}
            onChange={(event) =>
              setForm({ ...form, phone: event.target.value })
            }
          />
        )}
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
        />
        {mode === "register" && (
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Confirm password"
            type="password"
            value={form.password_confirmation}
            onChange={(event) =>
              setForm({ ...form, password_confirmation: event.target.value })
            }
          />
        )}
        <button
          disabled={busy}
          className="w-full rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-moss disabled:opacity-60"
        >
          {busy
            ? "Please wait..."
            : mode === "login"
              ? "Login"
              : "Create account"}
        </button>
      </form>
    </div>
  );
}

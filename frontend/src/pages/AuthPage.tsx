import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setError(null);

    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
      navigate("/");
    } catch (requestError) {
      if (
        axios.isAxiosError<{
          message?: string;
          errors?: Record<string, string[]>;
        }>(requestError)
      ) {
        const validationError = Object.values(
          requestError.response?.data?.errors ?? {},
        ).flat()[0];
        setError(
          validationError ??
            requestError.response?.data?.message ??
            "Unable to connect to the server. Please try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
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
          onClick={() => {
            setMode("login");
            setError(null);
          }}
        >
          Login
        </button>
        <button
          type="button"
          className={`flex-1 rounded-full px-4 py-2 ${mode === "register" ? "bg-ink text-white" : "text-ink/70"}`}
          onClick={() => {
            setMode("register");
            setError(null);
          }}
        >
          Register
        </button>
      </div>
      <form className="mt-8 space-y-4" onSubmit={submit}>
        {mode === "register" && (
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Full name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        )}
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="Email address"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        {mode === "register" && (
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Phone"
            type="tel"
            autoComplete="tel"
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
          autoComplete={
            mode === "register" ? "new-password" : "current-password"
          }
          minLength={mode === "register" ? 8 : undefined}
          required
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
            autoComplete="new-password"
            minLength={8}
            required
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
        {error && (
          <p className="text-sm font-medium text-red-700" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

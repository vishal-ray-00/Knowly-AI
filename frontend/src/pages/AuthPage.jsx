import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const inputClass =
  "w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent";

export default function AuthPage({ mode }) {
  const isLogin = mode === "login";
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-semibold tracking-tight">
            Knowly
          </h1>
          <p className="mt-2 text-sm text-muted">
            Ask your documents. Every answer cites its page.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border border-line bg-surface p-6"
        >
          <h2 className="font-serif text-xl font-semibold">
            {isLogin ? "Sign in" : "Create your account"}
          </h2>

          {!isLogin && (
            <input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
            minLength={6}
            required
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-accent py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {submitting
              ? "Please wait..."
              : isLogin
                ? "Sign in"
                : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          {isLogin ? "No account yet? " : "Already have an account? "}
          <Link
            to={isLogin ? "/signup" : "/login"}
            className="font-medium text-accent underline underline-offset-2"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}

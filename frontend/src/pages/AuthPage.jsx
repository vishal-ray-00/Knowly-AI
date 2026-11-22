import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Bubble from "../components/ui/Bubble";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";

const inputClass =
    "w-full rounded-full border border-transparent bg-[#f2f1f3] px-5 py-3.5 text-[15px] text-ink outline-none transition-all placeholder:text-muted focus:border-line focus:bg-white focus:ring-2 focus:ring-brand/50";

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
            navigate("/app", { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="grid min-h-screen bg-page lg:grid-cols-[1.05fr_1fr]">
            <aside className="hidden p-3 lg:block">
                <div className="grain-frame flex h-full flex-col rounded-[40px] p-2.5 pt-[68px]">
                    <span className="absolute left-7 top-5 z-10 text-lg font-medium text-white">
                        Answers you can check
                    </span>
                    <div className="relative flex flex-1 flex-col overflow-hidden rounded-[32px] bg-white">
                        <div className="orb absolute left-1/2 top-[42%] aspect-square w-[60%] max-w-[380px] -translate-x-1/2 -translate-y-1/2" />
                        <div className="relative z-10 flex flex-1 flex-col gap-3 px-10 pt-[14%]">
                            <Bubble side="user" delay={200}>
                                What does clause 7 say about termination?
                            </Bubble>
                            <Bubble side="ai" delay={1000}>
                                Either party may end the agreement with 30 days'
                                written notice.
                                <span className="ml-2 inline-flex rounded-full bg-lilac-100 px-2.5 py-0.5 text-sm font-medium text-brand">
                                    p. 6
                                </span>
                            </Bubble>
                        </div>
                        <p className="relative z-10 pb-7 text-center text-sm text-muted">
                            Your files stay private to your account.
                        </p>
                    </div>
                </div>
            </aside>

            <div className="flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <Link to="/" className="inline-block">
                        <Logo />
                    </Link>

                    <h1 className="mt-12 font-serif text-[40px] leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                        {isLogin ? "Welcome back" : "Create your account"}
                    </h1>
                    <p className="mt-3 text-lg text-muted">
                        {isLogin
                            ? "Sign in to open your documents."
                            : "Start asking your documents questions."}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-3">
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
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="mt-2 w-full !py-3.5 disabled:opacity-60"
                        >
                            {submitting
                                ? "Please wait..."
                                : isLogin
                                  ? "Sign in"
                                  : "Create account"}
                        </Button>
                    </form>

                    <p className="mt-6 text-[15px] text-muted">
                        {isLogin ? "No account yet? " : "Already have an account? "}
                        <Link
                            to={isLogin ? "/signup" : "/login"}
                            className="font-medium text-brand underline underline-offset-2"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
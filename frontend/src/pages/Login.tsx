import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      await login(fd.get("username") as string, fd.get("password") as string);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <div className="animate-fade-up">
        <p className="font-heading text-accent text-xs tracking-[0.4em] uppercase mb-4">
          Sign In
        </p>
        <h1 className="font-display text-6xl tracking-wider text-text-primary mb-6">
          ログイン
        </h1>
        <div className="w-12 h-px bg-accent mb-10" />
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded-sm animate-fade-up">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 delay-1 animate-fade-up">
        <div>
          <label className="block text-xs font-heading tracking-wider uppercase text-text-muted mb-2">
            名前
          </label>
          <input
            name="username"
            required
            className="w-full bg-transparent border-b border-border px-0 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
            placeholder="山田 太郎"
          />
        </div>
        <div>
          <label className="block text-xs font-heading tracking-wider uppercase text-text-muted mb-2">
            パスワード
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full bg-transparent border-b border-border px-0 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="group relative w-full py-4 bg-accent text-surface font-heading text-sm tracking-widest uppercase overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(212,168,83,0.3)]"
        >
          <span className="relative z-10">ログイン</span>
          <div className="absolute inset-0 bg-accent-hover scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </button>
      </form>

      <p className="mt-8 text-center text-text-muted text-sm delay-2 animate-fade-up">
        アカウントをお持ちでないですか？{" "}
        <Link to="/register" className="text-accent hover:text-accent-hover transition-colors">
          新規登録
        </Link>
      </p>
    </div>
  );
}

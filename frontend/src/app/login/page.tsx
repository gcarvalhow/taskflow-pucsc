"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error?.message || "Erro ao autenticar");
        setLoading(false);
        return;
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        // Redirecionar para página principal ou dashboard
        router.push("/");
      } else {
        setError("Resposta inesperada do servidor");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-surface p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-6 border border-gray-100"
      >
        <h1 className="text-3xl font-extrabold mb-2 text-center text-primary">Bem-vindo!</h1>
        <p className="text-muted text-center text-sm mb-2">Acesse sua conta para continuar</p>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-muted">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 bg-background text-gray-900"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-muted">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 bg-background text-gray-900"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-accent hover:bg-accent/90 text-white py-2 rounded-lg font-bold transition disabled:opacity-60 shadow-lg mt-2 border-2 border-accent focus:outline-none focus:ring-2 focus:ring-accent/60"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        {error && <div className="text-error text-sm text-center mt-2">{error}</div>}
        <div className="text-center mt-4">
          <span className="text-sm text-muted">Não tem conta? </span>
          <a
            href="/register"
            className="text-primary hover:underline text-sm font-medium"
          >
            Criar conta aqui
          </a>
        </div>
        <div className="text-center text-xs text-muted mt-4">
          <span>© {new Date().getFullYear()} TaskFlow</span>
        </div>
      </form>
    </div>
  );
}

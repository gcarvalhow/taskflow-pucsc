"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../auth-context";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  editing?: boolean;
  editTitle?: string;
};
export default function TasksPage() {
  const { token, user, loading: authLoading, logout } = useAuth() as any;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [authLoading, token, router]);

  useEffect(() => {
  if (!token) return;
  setLoading(true);
  fetch("http://localhost:3001/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTasks(data);
        else setError(data?.error?.message || "Erro ao carregar tarefas");
  })
  .catch(() => setError("Erro de conexão com o servidor"))
  .finally(() => setLoading(false));
  }, [token]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="text-muted text-lg">Carregando...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-surface p-6 rounded shadow text-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-surface rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
          <div>
            <h1 className="text-2xl font-bold text-primary">Minhas Tarefas</h1>
            {user && (
              <div className="text-xs text-muted mt-1">Usuário: <span className="font-semibold text-gray-900">{user.email}</span></div>
            )}
          </div>
          <button onClick={logout} className="text-sm text-error font-semibold hover:underline bg-error/10 px-3 py-1 rounded-lg border border-error/20">Sair</button>
        </div>
        {/* Formulário de nova tarefa */}
        <form
          className="flex gap-2 mb-8"
          onSubmit={async (e) => {
            e.preventDefault();
            setCreateError("");
            if (!newTitle.trim()) {
              setCreateError("Digite um título para a tarefa.");
              return;
            }
            setCreating(true);
            try {
              const res = await fetch("http://localhost:3001/tasks", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: newTitle }),
              });
              const data = await res.json();
              if (!res.ok) {
                setCreateError(data?.error?.message || "Erro ao criar tarefa");
              } else {
                setTasks((prev) => [data, ...prev]);
                setNewTitle("");
              }
            } catch {
              setCreateError("Erro de conexão com o servidor");
            } finally {
              setCreating(false);
            }
          }}
        >
          <input
            type="text"
            placeholder="Nova tarefa..."
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 bg-background text-gray-900"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            disabled={creating}
          />
          <button
            type="submit"
            className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-bold transition disabled:opacity-60 shadow-lg border-2 border-accent focus:outline-none focus:ring-2 focus:ring-accent/60"
            disabled={creating}
          >
            {creating ? "Adicionando..." : "Adicionar"}
          </button>
        </form>
        {createError && <div className="text-error text-sm mb-4 text-center">{createError}</div>}
        {tasks.length === 0 ? (
          <div className="text-muted text-center">Nenhuma tarefa encontrada.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <li key={task.id} className="py-3 flex items-center justify-between gap-2 group hover:bg-background/80 rounded-lg transition">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Checkbox de concluída */}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={async () => {
                      try {
                        const res = await fetch(`http://localhost:3001/tasks/${task.id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({ completed: !task.completed }),
                        });
                        if (res.ok) setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
                      } catch {}
                    }}
                    className="accent-primary w-4 h-4 rounded border-gray-300 focus:ring-primary/60"
                  />
                  {task.editing ? (
                    <form
                      className="flex gap-2 flex-1"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const newTitle = task.editTitle?.trim();
                        if (!newTitle) return;
                        try {
                          const res = await fetch(`http://localhost:3001/tasks/${task.id}`, {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ title: newTitle }),
                          });
                          if (res.ok) {
                            setTasks((prev) => prev.map(t => t.id === task.id ? { ...t, title: newTitle, editing: false, editTitle: undefined } : t));
                          }
                        } catch {}
                      }}
                    >
                      <input
                        type="text"
                        className="border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/60 bg-background text-gray-900 flex-1"
                        value={task.editTitle}
                        onChange={e => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, editTitle: e.target.value } : t))}
                        autoFocus
                      />
                      <button type="submit" className="bg-primary text-white px-2 py-1 rounded font-bold text-xs">Salvar</button>
                      <button type="button" className="text-muted ml-1 text-xs" onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, editing: false, editTitle: undefined } : t))}>Cancelar</button>
                    </form>
                  ) : (
                    <>
                      <span className={`font-medium truncate ${task.completed ? "line-through text-muted" : "text-gray-900"}`}>{task.title}</span>
                      {task.completed && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Concluída</span>
                      )}
                    </>
                  )}
                </div>
                <div className="flex gap-2 opacity-80 group-hover:opacity-100">
                  <button
                    className="text-xs text-primary font-bold hover:underline px-2 py-1 rounded hover:bg-primary/10"
                    onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, editing: true, editTitle: t.title } : t))}
                    disabled={task.editing}
                  >Editar</button>
                  <button
                    className="text-xs text-error font-bold hover:underline px-2 py-1 rounded hover:bg-error/10"
                    onClick={async () => {
                      if (!confirm('Deseja excluir esta tarefa?')) return;
                      try {
                        const res = await fetch(`http://localhost:3001/tasks/${task.id}`, {
                          method: "DELETE",
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        if (res.ok) setTasks(prev => prev.filter(t => t.id !== task.id));
                      } catch {}
                    }}
                  >Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

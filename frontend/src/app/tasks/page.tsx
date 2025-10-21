
"use client";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", completed: false });
  const [editId, setEditId] = useState<string|null>(null);

  // Busca todas as tasks reais do usuário
  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/tasks", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error?.message || "Erro ao buscar tasks");
        setTasks([]);
      } else {
        setTasks(data.tasks || []);
      }
    } catch (err) {
      setError("Erro ao buscar tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Cria ou edita uma task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      const url = editId ? `http://localhost:3001/tasks/${editId}` : "http://localhost:3001/tasks";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data?.message || "Erro ao salvar task");
        return;
      }
      setShowForm(false);
      setFormData({ title: "", description: "", completed: false });
      setEditId(null);
      await fetchTasks();
    } catch (err) {
      setError("Erro ao salvar task");
    }
  };

  // Exclui uma task
  const handleDelete = async (id: string) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const text = await res.text();
      console.log("DELETE response status:", res.status);
      console.log("DELETE response body:", text);
      if (!res.ok) {
        setError(`Erro ao excluir task: ${text}`);
        return;
      }
      await fetchTasks();
    } catch (err) {
      setError("Erro ao excluir task");
    }
  };

  // Abre formulário para editar
  const handleEdit = (task: any) => {
    setFormData({ title: task.title, description: task.description, completed: task.completed });
    setEditId(task.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-sans">
      <div className="bg-surface p-8 rounded-2xl shadow-xl w-full max-w-2xl flex flex-col gap-6 border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-2 text-center text-primary">Minhas Tasks</h1>
        <button
          className="bg-accent hover:bg-accent/90 text-white py-2 px-4 rounded-lg font-bold transition disabled:opacity-60 shadow-lg border-2 border-accent focus:outline-none focus:ring-2 focus:ring-accent/60 self-center"
          onClick={() => { setShowForm(true); setEditId(null); setFormData({ title: "", description: "", completed: false }); }}
        >Criar Task</button>
        {error && <div className="text-error text-sm text-center mt-2">{error}</div>}
        {showForm && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              placeholder="Título"
              className="border border-gray-200 rounded-lg px-3 py-2"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Descrição"
              className="border border-gray-200 rounded-lg px-3 py-2"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.completed}
                onChange={e => setFormData({ ...formData, completed: e.target.checked })}
              />
              Concluída
            </label>
            <div className="flex gap-2">
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-bold">{editId ? "Salvar" : "Criar"}</button>
              <button type="button" className="bg-muted text-white px-4 py-2 rounded-lg font-bold" onClick={() => { setShowForm(false); setEditId(null); }}>Cancelar</button>
            </div>
          </form>
        )}
        <div className="mt-6">
          {loading ? (
            <div className="text-center text-muted">Carregando...</div>
          ) : (
            <ul className="flex flex-col gap-4">
              {tasks.length === 0 ? (
                <li className="text-center text-muted">Nenhuma task cadastrada.</li>
              ) : (
                tasks.map(task => (
                  <li key={task.id} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2 bg-background">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">{task.title}</span>
                      <div className="flex gap-2">
                        <button className="bg-primary text-white px-2 py-1 rounded" onClick={() => handleEdit(task)}>Editar</button>
                        <button className="bg-error text-white px-2 py-1 rounded" onClick={() => handleDelete(task.id)}>Excluir</button>
                      </div>
                    </div>
                    <span className="text-muted text-sm">{task.description}</span>
                    <span className={`text-xs font-bold ${task.completed ? "text-green-600" : "text-error"}`}>{task.completed ? "Concluída" : "Pendente"}</span>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

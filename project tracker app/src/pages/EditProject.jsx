import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProject, updateProject } from "../services/api";

export default function EditProject() {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const p = await getProject(user.uid, id);
      if (!p) return nav("/dashboard");
      setForm({ title: p.title || "", description: p.description || "" });
      setLoading(false);
    })();
  }, [user, id, nav]);

  async function handleSubmit(e) {
    e.preventDefault();
    await updateProject(user.uid, id, {
      title: form.title.trim(),
      description: form.description.trim(),
    });
    nav(`/project/${id}`);
  }

  if (loading) return <div className="page">Loading…</div>;

  return (
    <div className="page">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit} className="card">
        <input
          placeholder="Project title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="btn" type="submit">Update</button>
      </form>
    </div>
  );
}

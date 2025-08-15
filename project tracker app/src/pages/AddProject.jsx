import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createProject } from "../services/api";

export default function AddProject() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      createdAt: Date.now(),
    };
    await createProject(user.uid, payload);
    setSaving(false);
    nav("/dashboard");
  }

  return (
    <div className="page">
      <h2>Add Project</h2>
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
        <button className="btn" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}

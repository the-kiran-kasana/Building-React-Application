import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { deleteProject } from "../services/api";
import useDebounce from "../hooks/useDebounce";

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search + sort
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const [sortBy, setSortBy] = useState("createdAt");

  useEffect(() => {
    if (!user) return;
    const r = ref(db, `users/${user.uid}/projects`);
    const unsub = onValue(r, (snap) => {
      const val = snap.val();
      const list = val ? Object.entries(val).map(([id, v]) => ({ id, ...v })) : [];
      setProjects(list);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const filtered = useMemo(() => {
    const s = debounced.trim().toLowerCase();
    let arr = projects;
    if (s) {
      arr = arr.filter(
        (p) =>
          p.title?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s)
      );
    }
    if (sortBy === "createdAt") {
      arr = [...arr].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (sortBy === "title") {
      arr = [...arr].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }
    return arr;
  }, [projects, debounced, sortBy]);

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    await deleteProject(user.uid, id);
    // No manual state update needed — realtime listener updates UI.
  }

  return (
    <div className="page">
      <h2>Dashboard</h2>

      <div className="filters">
        <input
          placeholder="Search projects…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Sort by: Newest</option>
          <option value="title">Sort by: Title</option>
        </select>
        <Link to="/add" className="btn">+ New Project</Link>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="empty">No projects yet.</div>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <div key={p.id} className="card">
              <h3>{p.title}</h3>
              <p className="muted">{p.description}</p>
              <p className="tiny">Created: {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}</p>
              <div className="row">
                <Link className="btn" to={`/project/${p.id}`}>Open</Link>
                <Link className="btn ghost" to={`/edit/${p.id}`}>Edit</Link>
                <button className="btn danger" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

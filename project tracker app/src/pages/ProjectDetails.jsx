import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { addTask, deleteTask, getProject, updateTask } from "../services/api";
import TaskFilters from "../components/TaskFilters";
import useDebounce from "../hooks/useDebounce";

const TASKS_PER_PAGE = 6;

export default function ProjectDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);

  // Filters / sort / search
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCompleted, setFilterCompleted] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  // Pagination
  const [page, setPage] = useState(1);

  // Load project meta once (title/desc)
  useEffect(() => {
    (async () => {
      const p = await getProject(user.uid, id);
      if (!p) return nav("/dashboard");
      setProject(p);
      setLoadingProject(false);
    })();
  }, [user, id, nav]);

  // Realtime tasks listener
  useEffect(() => {
    const r = ref(db, `users/${user.uid}/projects/${id}/tasks`);
    const unsub = onValue(r, (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([tid, t]) => ({ id: tid, ...t }));
      setTasks(list);
    });
    return () => unsub();
  }, [user, id]);

  const visibleTasks = useMemo(() => {
    let arr = tasks;

    // search
    const s = debounced.trim().toLowerCase();
    if (s) {
      arr = arr.filter((t) => t.title?.toLowerCase().includes(s));
    }

    // filter
    if (filterPriority !== "all") arr = arr.filter((t) => t.priority === filterPriority);
    if (filterCompleted !== "all") {
      const done = filterCompleted === "done";
      arr = arr.filter((t) => !!t.completed === done);
    }

    // sort
    if (sortBy === "createdAt") {
      arr = [...arr].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (sortBy === "priority") {
      const rank = { high: 3, normal: 2, low: 1 };
      arr = [...arr].sort((a, b) => (rank[b.priority] || 0) - (rank[a.priority] || 0));
    }

    return arr;
  }, [tasks, debounced, filterPriority, filterCompleted, sortBy]);

  // page slice
  const pages = Math.max(1, Math.ceil(visibleTasks.length / TASKS_PER_PAGE));
  const paged = visibleTasks.slice((page - 1) * TASKS_PER_PAGE, page * TASKS_PER_PAGE);

  useEffect(() => {
    // Reset to page 1 if filters/search change and page becomes invalid
    setPage(1);
  }, [debounced, filterPriority, filterCompleted, sortBy]);

  async function handleAddTask(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") || "").trim();
    const priority = String(form.get("priority"));
    if (!title) return;

    await addTask(user.uid, id, {
      title,
      completed: false,
      priority,
      createdAt: Date.now(),
    });
    e.currentTarget.reset();
  }

  async function toggleTask(t) {
    await updateTask(user.uid, id, t.id, { completed: !t.completed });
  }

  async function changePriority(t, newPriority) {
    await updateTask(user.uid, id, t.id, { priority: newPriority });
  }

  async function removeTask(tid) {
    if (!confirm("Delete this task?")) return;
    await deleteTask(user.uid, id, tid);
  }

  if (loadingProject) return <div className="page">Loading…</div>;

  return (
    <div className="page">
      <div className="header-row">
        <div>
          <h2>{project?.title}</h2>
          <p className="muted">{project?.description}</p>
          <p className="tiny">Created: {project?.createdAt ? new Date(project.createdAt).toLocaleString() : "—"}</p>
        </div>
      </div>

      <TaskFilters
        search={search} setSearch={setSearch}
        filterPriority={filterPriority} setFilterPriority={setFilterPriority}
        filterCompleted={filterCompleted} setFilterCompleted={setFilterCompleted}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      <form onSubmit={handleAddTask} className="row card">
        <input name="title" placeholder="New task title…" />
        <select name="priority" defaultValue="normal">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button className="btn" type="submit">Add Task</button>
      </form>

      {paged.length === 0 ? (
        <div className="empty">No tasks found.</div>
      ) : (
        <ul className="list">
          {paged.map((t) => (
            <li key={t.id} className={`item ${t.completed ? "done" : ""}`}>
              <label className="row">
                <input type="checkbox" checked={!!t.completed} onChange={() => toggleTask(t)} />
                <span className="task-title">{t.title}</span>
              </label>
              <div className="row">
                <select
                  value={t.priority || "normal"}
                  onChange={(e) => changePriority(t, e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
                <button className="btn danger" onClick={() => removeTask(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
        <button className="btn ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span className="muted">Page {page} / {pages}</span>
        <button className="btn ghost" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

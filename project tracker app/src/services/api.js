import axios from "axios";
import { auth } from "./firebase";
import { getIdToken } from "firebase/auth";

// Axios instance with your DB base URL (Realtime DB requires .json endpoints)
const api = axios.create({
  baseURL: import.meta.env.VITE_FB_DB_URL || "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  // Example: VITE_FB_DB_URL=https://your-id-default-rtdb.firebaseio.com
});

// Helper to attach ?auth=ID_TOKEN to each request for secured rules
async function withAuthParams(params = {}) {
  const user = auth.currentUser;
  const token = user ? await getIdToken(user, true) : null;
  return token ? { ...params, auth: token } : params;
}

/** -------- PROJECTS -------- */
export async function listProjects(uid) {
  const params = await withAuthParams();
  const { data } = await api.get(`/users/${uid}/projects.json`, { params });
  // Convert { id: obj } -> [ {id, ...obj} ]
  return data
    ? Object.entries(data).map(([id, v]) => ({ id, ...v }))
    : [];
}

export async function getProject(uid, id) {
  const params = await withAuthParams();
  const { data } = await api.get(`/users/${uid}/projects/${id}.json`, { params });
  return data ? { id, ...data } : null;
}

export async function createProject(uid, project) {
  const params = await withAuthParams();
  const { data } = await api.post(`/users/${uid}/projects.json`, project, { params });
  return data; // { name: newId }
}

export async function updateProject(uid, id, project) {
  const params = await withAuthParams();
  return api.patch(`/users/${uid}/projects/${id}.json`, project, { params });
}

export async function deleteProject(uid, id) {
  const params = await withAuthParams();
  return api.delete(`/users/${uid}/projects/${id}.json`, { params });
}

/** -------- TASKS -------- */
export async function addTask(uid, projectId, task) {
  const params = await withAuthParams();
  const { data } = await api.post(
    `/users/${uid}/projects/${projectId}/tasks.json`,
    task,
    { params }
  );
  return data; // { name: taskId }
}

export async function updateTask(uid, projectId, taskId, task) {
  const params = await withAuthParams();
  return api.patch(
    `/users/${uid}/projects/${projectId}/tasks/${taskId}.json`,
    task,
    { params }
  );
}

export async function deleteTask(uid, projectId, taskId) {
  const params = await withAuthParams();
  return api.delete(
    `/users/${uid}/projects/${projectId}/tasks/${taskId}.json`,
    { params }
  );
}

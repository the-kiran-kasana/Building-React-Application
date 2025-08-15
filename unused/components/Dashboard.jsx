import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const projects = [
    { id: 1, name: "React App" },
    { id: 2, name: "Firebase Project" }
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/add">Add Project</Link>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <Link to={`/project/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

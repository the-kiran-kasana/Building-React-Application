import React from "react";
import { useParams, Link } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();
  return (
    <div>
      <h2>Project Details - {id}</h2>
      <Link to={`/edit/${id}`}>Edit Project</Link>
    </div>
  );
}

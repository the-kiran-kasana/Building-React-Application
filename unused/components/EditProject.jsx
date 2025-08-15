import React from "react";
import { useParams } from "react-router-dom";

export default function EditProject() {
  const { id } = useParams();
  return <h2>Edit Project - {id}</h2>;
}

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginUser } from "../feature/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("Please fill the form");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    setFormError("");
    dispatch(LoginUser({ email, password }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Welcome to Login</h2>
        {formError && <p style={{ color: "red" }}>{formError}</p>}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

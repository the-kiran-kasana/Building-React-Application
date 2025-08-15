import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SignupUser } from "../feature/AuthSlice"; // import asyncThunk

export default function SignUp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setFormError("Please fill the form");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    setFormError("");
    dispatch(SignupUser({ email, password }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Welcome to SignUp</h2>
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
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

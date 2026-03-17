import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addRegisteredUser,
  getRegisteredUsers,
  getAuthUser,
} from "../services/auth";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {
    if (getAuthUser()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    const existing = getRegisteredUsers().find(
      (user) => user.email === form.email.trim().toLowerCase(),
    );
    if (existing) {
      toast.error("An account with that email already exists.");
      return;
    }

    addRegisteredUser({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });

    toast.success("Account created! You can now log in.");
    navigate("/login", { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create an account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="mb-2">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Your full name"
              autoComplete="name"
            />
          </div>

          <div className="mb-2">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="you@example.com"
              autoComplete="email"
              type="email"
            />
          </div>

          <div className="mb-2">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="confirm">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className="form-control"
              type="password"
              placeholder="Repeat password"
              autoComplete="new-password"
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

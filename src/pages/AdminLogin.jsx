import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRegisteredUsers, setAuthUser, getAuthUser } from "../services/auth";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

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

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const users = getRegisteredUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      toast.error("Invalid email or password.");
      return;
    }

    setAuthUser({ email: user.email, name: user.name });
    toast.success("Logged in successfully.");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Admin login</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="mb-2">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Log in
          </button>
        </form>

        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;

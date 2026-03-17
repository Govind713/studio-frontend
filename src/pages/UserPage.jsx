import React from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthUser } from "../services/auth";

function UserPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthUser();
    navigate("/login");
  };

  return (
    <div>
      <h2>User Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserPage;

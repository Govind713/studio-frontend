import React, { useState, useEffect } from "react";
import { getAuthUser } from "../services/auth";
import { getFilteredData } from "../services/data";

function Dashboard() {
  const user = getAuthUser();
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalWorks: 0,
    totalComplaints: 0,
  });

  useEffect(() => {
    const data = getFilteredData();
    setStats({
      totalCategories: data.totalCategories,
      totalWorks: data.totalWorks,
      totalComplaints: data.totalComplaints,
    });
  }, []);

  return (
    <div className="page-content">
      <h2>Dashboard</h2>
      <p className="lead">
        Welcome back{user?.name ? `, ${user.name}` : ""}! This is your admin
        overview.
      </p>
      <p>Use the side menu to jump between different sections.</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Categories</h5>
              <p className="card-text display-4">{stats.totalCategories}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Works</h5>
              <p className="card-text display-4">{stats.totalWorks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Complaints</h5>
              <p className="card-text display-4">{stats.totalComplaints}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

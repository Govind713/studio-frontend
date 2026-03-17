import React, { useState, useEffect } from "react";
import { getWorks } from "../services/data";

function Work() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    setWorks(getWorks());
  }, []);

  return (
    <div className="page-content">
      <h2>Submitted Works</h2>
      <p>
        View all submitted works along with their complete details for
        monitoring.
      </p>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Submitted By</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work) => (
            <tr key={work.id}>
              <td>{work.id}</td>
              <td>{work.title}</td>
              <td>{work.category}</td>
              <td>{work.submittedBy}</td>
              <td>{work.date}</td>
              <td>
                <span
                  className={`badge ${
                    work.status === "Approved"
                      ? "bg-success"
                      : work.status === "Pending"
                        ? "bg-warning"
                        : "bg-danger"
                  }`}
                >
                  {work.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Work;

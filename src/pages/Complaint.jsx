import React, { useState, useEffect } from "react";
import { getComplaints, updateComplaint } from "../services/data";

function Complaint() {
  const [complaints, setComplaints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  const handleStatusChange = (id, newStatus) => {
    updateComplaint(id, { status: newStatus });
    setComplaints(getComplaints());
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setResponse(complaint.response || "");
    setShowModal(true);
  };

  const handleSaveResponse = () => {
    updateComplaint(selectedComplaint.id, { response });
    setComplaints(getComplaints());
    setShowModal(false);
  };

  return (
    <div className="page-content">
      <h2>Complaint Management</h2>
      <p>
        View and manage user complaints by checking details, updating status,
        and providing responses.
      </p>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Submitted By</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((comp) => (
            <tr key={comp.id}>
              <td>{comp.id}</td>
              <td>{comp.title}</td>
              <td>{comp.description}</td>
              <td>{comp.submittedBy}</td>
              <td>{comp.date}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={comp.status}
                  onChange={(e) => handleStatusChange(comp.id, e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleViewDetails(comp)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedComplaint && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedComplaint.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Description:</strong> {selectedComplaint.description}
                </p>
                <p>
                  <strong>Submitted By:</strong> {selectedComplaint.submittedBy}
                </p>
                <p>
                  <strong>Date:</strong> {selectedComplaint.date}
                </p>
                <p>
                  <strong>Status:</strong> {selectedComplaint.status}
                </p>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Response:</strong>
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter your response here..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveResponse}
                >
                  Save Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaint;

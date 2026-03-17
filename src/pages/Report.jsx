import React, { useState, useEffect } from "react";
import { getFilteredData } from "../services/data";

function Report() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState({
    totalCategories: 0,
    totalWorks: 0,
    totalComplaints: 0,
    filteredWorks: 0,
    filteredComplaints: 0,
  });

  useEffect(() => {
    const data = getFilteredData(startDate, endDate);
    setReportData(data);
  }, [startDate, endDate]);

  const handleFilter = () => {
    const data = getFilteredData(startDate, endDate);
    setReportData(data);
  };

  return (
    <div className="page-content">
      <h2>Reports</h2>
      <p>
        View summaries such as total categories, total works, and total
        complaints, with options to filter reports based on specific dates.
      </p>

      <div className="row mb-4">
        <div className="col-md-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Categories</h5>
              <p className="card-text display-4">
                {reportData.totalCategories}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Works</h5>
              <p className="card-text display-4">{reportData.totalWorks}</p>
              {startDate && endDate && (
                <small className="text-muted">
                  Filtered: {reportData.filteredWorks}
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Complaints</h5>
              <p className="card-text display-4">
                {reportData.totalComplaints}
              </p>
              {startDate && endDate && (
                <small className="text-muted">
                  Filtered: {reportData.filteredComplaints}
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;

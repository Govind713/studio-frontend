import React, { useState, useEffect } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/data";

function Category() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleAdd = () => {
    setEditingCategory(null);
    setForm({ name: "", description: "" });
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setForm({ name: category.name, description: category.description });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
      setCategories(getCategories());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, form);
    } else {
      addCategory(form);
    }
    setCategories(getCategories());
    setShowModal(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-content">
      <h2>Category Management</h2>
      <p>Add, view, update, and delete categories here.</p>

      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Add New Category
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(cat)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingCategory ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;

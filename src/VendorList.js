import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import "./VendorList.css";

const VendorList = () => {
  const { vendors, setVendors } = useContext(AppContext);
  const [vendorName, setVendorName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const resetForm = () => {
    setVendorName("");
    setEmail("");
    setContact("");
    setEditId(null);
    setError("");
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (vendor) => {
    setVendorName(vendor.name);
    setEmail(vendor.email);
    setContact(vendor.contact);
    setEditId(vendor.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );
    if (confirmDelete) {
      setVendors(vendors.filter((v) => v.id !== id));
    }
  };

  const validate = () => {
    if (!vendorName || !email || !contact) {
      setError("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };

  const saveVendor = () => {
    if (!validate()) return;

    if (editId) {
      const updatedList = vendors.map((v) =>
        v.id === editId ? { id: v.id, name: vendorName, email, contact } : v
      );
      setVendors(updatedList);
    } else {
      const newVendor = {
        id: vendors.length ? vendors[vendors.length - 1].id + 1 : 1,
        name: vendorName,
        email,
        contact,
      };
      setVendors([...vendors, newVendor]);
    }

    setShowModal(false);
    resetForm();
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vendor-page">
      <h2 className="page-title">Vendor Directory</h2>

      <input
        className="search-box"
        type="text"
        placeholder="Search by vendor name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="vendor-grid">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            <h3>{vendor.name}</h3>
            <p>
              <strong>Email:</strong> {vendor.email}
            </p>
            <p>
              <strong>Contact:</strong> {vendor.contact}
            </p>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(vendor)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(vendor.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-vendor-btn" onClick={openAddModal}>
        + Add New Vendor
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editId ? "Edit Vendor" : "Add Vendor"}</h3>

            <input
              type="text"
              placeholder="Vendor Name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Vendor Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />

            {error && <p className="error-msg">{error}</p>}

            <div className="modal-actions">
              <button onClick={saveVendor}>{editId ? "Update" : "Add"}</button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorList;

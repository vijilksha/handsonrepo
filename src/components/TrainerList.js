import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import "./TrainerList.css";

const TrainerList = () => {
  const { trainers, setTrainers } = useContext(AppContext);
  const [trainerName, setTrainerName] = useState("");
  const [technology, setTechnology] = useState("");
  const [experience, setExperience] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const resetForm = () => {
    setTrainerName("");
    setTechnology("");
    setExperience("");
    setEditId(null);
    setError("");
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const validate = () => {
    if (!trainerName || !technology || !experience) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(experience) || experience < 0) {
      setError("Years of experience must be a positive number.");
      return false;
    }
    return true;
  };

  const saveTrainer = () => {
    if (!validate()) return;

    const newTrainer = {
      id: editId || Date.now(),
      name: trainerName,
      technology,
      experience,
    };

    if (editId) {
      setTrainers(trainers.map((t) => (t.id === editId ? newTrainer : t)));
    } else {
      setTrainers([...trainers, newTrainer]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (trainer) => {
    setTrainerName(trainer.name);
    setTechnology(trainer.technology);
    setExperience(trainer.experience);
    setEditId(trainer.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this trainer?");
    if (confirmDelete) {
      setTrainers(trainers.filter((t) => t.id !== id));
    }
  };

  const filteredTrainers = trainers.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="trainer-page">
      <h2 className="page-title">Trainer Directory</h2>

      <input
        className="search-box"
        type="text"
        placeholder="Search by trainer name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="trainer-grid">
        {filteredTrainers.map((trainer) => (
          <div key={trainer.id} className="trainer-card">
            <h3>{trainer.name}</h3>
            <p>
              <strong>Technology:</strong> {trainer.technology}
            </p>
            <p>
              <strong>Experience:</strong> {trainer.experience} year(s)
            </p>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(trainer)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(trainer.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-trainer-btn" onClick={openAddModal}>
        + Add Trainer
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editId ? "Edit Trainer" : "Add Trainer"}</h3>

            <input
              type="text"
              placeholder="Trainer Name"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Technology"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            />
            <input
              type="number"
              placeholder="Years of Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />

            {error && <p className="error-msg">{error}</p>}

            <div className="modal-actions">
              <button onClick={saveTrainer}>{editId ? "Update" : "Add"}</button>
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

export default TrainerList;

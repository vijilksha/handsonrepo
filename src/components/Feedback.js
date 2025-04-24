import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import "./Feedback.css";

const Feedback = () => {
  const { cohorts, mapping, trainers, feedback, setFeedback } =
    useContext(AppContext);

  const handleFeedback = (cohortId, score) => {
    setFeedback({ ...feedback, [cohortId]: score });
  };

  return (
    <div className="feedback-wrapper">
      <h2 className="feedback-heading">Trainer Feedback Dashboard</h2>
      <div className="feedback-grid">
        {cohorts.map((c) => {
          const mapped = mapping.find((m) => m.cohortId === c.id);
          const trainer =
            mapped && trainers.find((t) => t.id === mapped.trainerId);

          return (
            <div className="feedback-card" key={c.id}>
              <div className="card-header">
                <h3>Cohort {c.id}</h3>
                <span className="tech-tag">{c.tech}</span>
              </div>
              <p>
                <strong>Trainer:</strong> {trainer?.name || "Not Mapped"}
              </p>
              <input
                type="number"
                placeholder="Feedback %"
                className="feedback-input"
                min={0}
                max={100}
                onBlur={(e) => handleFeedback(c.id, parseInt(e.target.value))}
              />
              {feedback[c.id] !== undefined && (
                <p
                  className={
                    feedback[c.id] < 85 ? "payment reduced" : "payment full"
                  }
                >
                  {feedback[c.id] < 85
                    ? "⚠️ Payment Reduced by 20%"
                    : "✅ Full Payment Approved"}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feedback;

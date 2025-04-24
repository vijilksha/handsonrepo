import React, { useContext } from "react";
import { AppContext } from "../AppContext";

const CohortMap = () => {
  const { cohorts, trainers, mapping, setMapping } = useContext(AppContext);

  const handleAssign = (cohortId, trainerId) => {
    setMapping([...mapping, { cohortId, trainerId }]);
  };

  return (
    <div>
      <h2>Map Cohorts to Trainers</h2>
      {cohorts.map((c) => (
        <div key={c.id}>
          <strong>{c.tech}</strong> (Cohort {c.id})
          <select
            onChange={(e) => handleAssign(c.id, parseInt(e.target.value))}
          >
            <option>Select Trainer</option>
            {trainers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default CohortMap;

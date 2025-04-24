import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [vendors, setVendors] = useState([
    { id: 1, name: "Vendor A", email: "a@example.com", contact: "1234567890" },
    { id: 2, name: "Vendor B", email: "b@example.com", contact: "9876543210" },
  ]);

  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "Arun",
      technology: "Java",
      experience: 5,
      vendorId: 1,
    },
    {
      id: 2,
      name: "Meera",
      technology: "React",
      experience: 3,
      vendorId: 2,
    },
  ]);
  const [cohorts, setCohorts] = useState([
    { id: "A1", tech: "React" },
    { id: "B2", tech: "Java" },
  ]);

  const [mapping, setMapping] = useState([]); // cohortId -> trainerId

  const [feedback, setFeedback] = useState({}); // cohortId -> score

  return (
    <AppContext.Provider
      value={{
        vendors,
        setVendors,
        trainers,
        setTrainers,
        cohorts,
        setCohorts,
        mapping,
        setMapping,
        feedback,
        setFeedback,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

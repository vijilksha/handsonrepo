import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./AppContext";
import CohortMap from "./components/CohortMap";
import Feedback from "./components/Feedback";
import TrainerList from "./components/TrainerList";
import VendorList from "./VendorList";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <nav>
          <Link to="/">Vendors</Link>
          <Link to="/trainers">Trainers</Link>
          <Link to="/map">Cohort Mapping</Link>
          <Link to="/feedback">Feedback</Link>
        </nav>
        <Routes>
          <Route path="/" element={<VendorList />} />
          <Route path="/trainers" element={<TrainerList />} />
          <Route path="/map" element={<CohortMap />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;

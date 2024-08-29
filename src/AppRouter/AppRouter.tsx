import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GridView } from "../pages/GridView";
import { DetailView } from "../pages/DetailView";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GridView />} />
        <Route path="/photo/:id" element={<DetailView />} />
      </Routes>
    </Router>
  );
};

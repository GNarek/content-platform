import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GridView } from "../pages/GridView";
import { DetailView } from "../pages/DetailView";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <GridView />
            </ErrorBoundary>
          }
        />
        <Route
          path="/photo/:id"
          element={
            <ErrorBoundary>
              <DetailView />
            </ErrorBoundary>
          }
        />
      </Routes>
    </Router>
  );
};

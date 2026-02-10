import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import CitySelection from './components/Dashboard/CitySelection';
import CinemaList from './components/Booking/CinemaList';
import ShowSelection from './components/Booking/ShowSelection';
import SeatSelection from './components/Booking/SeatSelection';
import Confirmation from './components/Booking/Confirmation';
import { storage } from './utils/storage';
import Layout from './components/Common/Layout';

// Protected Route Component
const ProtectedRoute = ({ children, requireCity = false }) => {
  const user = storage.getLoggedInUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireCity) {
    const city = storage.getSelectedCity();
    if (!city) {
      return <Navigate to="/select-city" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - No Layout for Login/Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Wrapped in Layout */}
        <Route
          path="/select-city"
          element={
            <ProtectedRoute>
              <Layout>
                <CitySelection />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute requireCity={true}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute requireCity={true}>
              <Layout>
                <CinemaList />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking/time"
          element={
            <ProtectedRoute requireCity={true}>
              <Layout>
                <ShowSelection />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking/seats"
          element={
            <ProtectedRoute requireCity={true}>
              <Layout>
                <SeatSelection />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking/success"
          element={
            <ProtectedRoute requireCity={true}>
              <Layout>
                <Confirmation />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Layout } from "./components/layout/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Planner } from "./pages/Planner";
import { Practice } from "./pages/Practice";
import { Analytics } from "./pages/Analytics";
import { CreatePlan } from "./pages/CreatePlan";
import { Tests } from "./pages/Tests";
import { StudySession } from "./pages/StudySession";
import { Revision } from "./pages/Revision";
import { Leaderboard } from "./pages/Leaderboard";
import { Achievements } from "./pages/Achievements";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminLogin } from "./pages/AdminLogin";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin" : "/"} replace />;
  }
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public Logic Routes */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/admin-login" element={<PublicRoute><AdminLogin /></PublicRoute>} />

            {/* Protected App Routes */}
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="create-plan" element={<CreatePlan />} />
              <Route path="planner" element={<Planner />} />
              <Route path="practice" element={<Practice />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="tests" element={<Tests />} />
              <Route path="session" element={<StudySession />} />
              <Route path="revision" element={<Revision />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="achievements" element={<Achievements />} />
              
              {/* Admin Protected Route */}
              <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

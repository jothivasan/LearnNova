/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Planner } from "./pages/Planner";
import { Theory } from "./pages/Theory";
import { Practice } from "./pages/Practice";
import { Analytics } from "./pages/Analytics";
import { CreatePlan } from "./pages/CreatePlan";
import { Tests } from "./pages/Tests";
import { StudySession } from "./pages/StudySession";
import { Revision } from "./pages/Revision";
import { Leaderboard } from "./pages/Leaderboard";
import { Achievements } from "./pages/Achievements";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="create-plan" element={<CreatePlan />} />
          <Route path="planner" element={<Planner />} />
          <Route path="theory" element={<Theory />} />
          <Route path="practice" element={<Practice />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="tests" element={<Tests />} />
          <Route path="session" element={<StudySession />} />
          <Route path="revision" element={<Revision />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="achievements" element={<Achievements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import SelectionGrid from "./components/SelectionGrid"; // New component for home page selections
import DataStructureSelector from "./pages/DataStructureSelector"; // Import your selector
import DataStructureRenderer from "./components/DataStructureRenderer"; // Import your renderer for instances
import GraphPage from "./pages/GraphPage";
import WorkInProgress from "./components/WorkInProgress";
import { useState } from "react";

const App: React.FC = () => {
  return (
    <Router>
      <div className="layout">
        <Routes>
          <Route path="/" element={<SelectionGrid />} /> {/* Home screen */}
          <Route path="/data-structures" element={<DataStructureSelector />} /> {/* Data structures */}
          <Route path="/data-structures/:structure" element={<DataStructureRenderer />} /> {/* Data structure instance */}
          <Route path="/graphs" element={<GraphPage />} />
          <Route path="/mazes" element={<WorkInProgress />} />
          <Route path="/puzzles" element={<WorkInProgress />} />
          <Route path="/sorting" element={<WorkInProgress />} />
          <Route path="/state_machines" element={<WorkInProgress />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

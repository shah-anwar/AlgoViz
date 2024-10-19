import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import DataStructureSelector from "./components/DataStructureSelector"; // Import your selector
import CodeDisplay from "./components/CodeDisplay";
import StackInstance from "./components/StackInstance";
import QueueInstance from "./components/QueueInstance";
import { useState, useEffect } from "react";

// Define a union type for selected structures
type DataStructureType = "queue" | "stack" | "default";

const App: React.FC = () => {
  const { structure } = useParams<{ structure?: string }>();

  // Set the state with the explicit type
  const [selectedStructure, setSelectedStructure] = useState<DataStructureType>(
    (structure as DataStructureType) || "default" // Cast the structure to the correct type
  );

  useEffect(() => {
    // Update selected structure if it changes in the URL
    if (structure) {
      setSelectedStructure(structure as DataStructureType); // Cast here too
    }
  }, [structure]);

  return (
    <div className="layout">
      {/* Upper half */}
      <div className="upper">
        {/* Top left: Visualiser */}
        <div className="visualiser">
          <Router>
            <Routes>
              <Route path="/" element={<DataStructureSelector />} />{" "}
              {/* Home screen */}
              <Route
                path="/data-structures/:structure"
                element={
                  <DataStructureRenderer
                    setSelectedStructure={setSelectedStructure}
                  />
                }
              />
            </Routes>
          </Router>
        </div>

        {/* Top right: Code */}
        <div className="code-display">
          <h2>Code</h2>
          <CodeDisplay structure={selectedStructure} />
        </div>
      </div>

      {/* Lower half: Output */}
      <div className="output">
        <h2>Output</h2>
        {/* Output content goes here */}
      </div>
    </div>
  );
};

interface DataStructureRendererProps {
  setSelectedStructure: (structure: DataStructureType) => void; // Update the type here
}

const DataStructureRenderer: React.FC<DataStructureRendererProps> = ({
  setSelectedStructure,
}) => {
  const { structure } = useParams<{ structure: string }>();

  useEffect(() => {
    // Update the selected structure when the URL parameter changes
    if (structure) {
      setSelectedStructure(structure as DataStructureType); // Cast here too
    }
  }, [structure, setSelectedStructure]);

  const renderInstance = (structure: string | undefined) => {
    switch (structure) {
      case "stack":
        return <StackInstance />;
      case "queue":
        return <QueueInstance />;
      // Add other cases for additional data structures
      default:
        return <p>Invalid data structure selected</p>;
    }
  };

  return renderInstance(structure);
};

export default App;

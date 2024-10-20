import React from "react";
import { useParams } from "react-router-dom";
import StackInstance from "./StackInstance"; // Import your stack instance component
import QueueInstance from "./QueueInstance"; // Import your queue instance component
import CodeDisplay from "./CodeDisplay"; // Import your code display component
import OutputDisplay from "./OutputDisplay"; // Import your output display component

const DataStructureRenderer: React.FC = () => {
  const { structure } = useParams<{ structure?: string }>();

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

  // Default output messages for OutputDisplay
  const outputMessages: string[] = ["Output will be displayed here."];

  return (
    <div className="data-structure-renderer">
      <div className="upper">
        {/* Top left: Visualiser */}
        <div className="visualiser">
          {renderInstance(structure)}
        </div>

        {/* Top right: Code Display */}
        <div className="code-display">
          <h2>Code</h2>
          <CodeDisplay structure={structure as "stack" | "queue" | "array" | "default"} />
        </div>
      </div>

      {/* Bottom: Output Display */}
      <div className="output-display">
        <OutputDisplay output={outputMessages} />
      </div>
    </div>
  );
};

export default DataStructureRenderer;

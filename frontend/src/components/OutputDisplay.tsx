import React from "react";

interface OutputDisplayProps {
  output: string[]; // Array of output messages
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  return (
    <div className="output">
      <h2>Output</h2>
      <ul>
        {output.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default OutputDisplay;

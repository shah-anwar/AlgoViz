import React from "react";
import { Link } from "react-router-dom";
import './DataStructureSelector.css'; // Import the CSS for styling
import test from "../images/test.webp";

const DataStructureSelector: React.FC = () => {
  return (
    <div className="data-structure-selector">
      <h1>Select a Data Structure</h1>
      <div className="grid-container">
        <Link to="/data-structures/stack" className="grid-item">
          <img src={test} alt="Stack" />
          <h2>Stack</h2>
        </Link>
        <Link to="/data-structures/queue" className="grid-item">
          <img src={test} alt="Queue" />
          <h2>Queue</h2>
        </Link>
        <Link to="/data-structures/array" className="grid-item">
          <img src={test} alt="Array" />
          <h2>Array</h2>
        </Link>
        {/* Add more links for other data structures here */}
      </div>
    </div>
  );
};

export default DataStructureSelector;

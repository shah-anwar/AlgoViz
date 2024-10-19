import React from "react";
import { Link } from "react-router-dom";

const DataStructureSelector: React.FC = () => {
  return (
    <div>
      <h1>Select a Data Structure</h1>
      <Link to="/data-structures/stack">
        <button>Stack</button>
      </Link>
      <Link to="/data-structures/queue">
        <button>Queue</button>
      </Link>
      <Link to="/data-structures/array">
        <button>Array</button>
      </Link>
      {/* Add more links for other data structures here */}
    </div>
  );
};

export default DataStructureSelector;

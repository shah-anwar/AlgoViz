import React from "react";
import { Link } from "react-router-dom";
import "./SelectionGrid.css"; // Create a new CSS file for grid styling
import test from "../images/test.webp";
import datastructures from "../images/data-structures.png";
import graphs from "../images/graphs.png";
import maze from "../images/maze.png";

const SelectionGrid: React.FC = () => {
  return (
    <div className="selection-grid">
      <h1>Select an Option</h1>
      <div className="grid-container">
        <Link to="/data-structures">
          <div className="grid-item">
            <img src={datastructures} alt="Data Structures" />
            <h2>Data Structures</h2>
          </div>
        </Link>
        <Link to="/graphs">
          <div className="grid-item">
            <img src={graphs} alt="Graphs" />
            <h2>Graphs</h2>
          </div>
        </Link>
        <Link to="/mazes">
          <div className="grid-item">
            <img src={maze} alt="Mazes" />
            <h2>Mazes</h2>
          </div>
        </Link>
        <Link to="/puzzles">
          <div className="grid-item">
            <img src={test} alt="Puzzles" />
            <h2>Puzzles</h2>
          </div>
        </Link>
        <Link to="/sorting">
          <div className="grid-item">
            <img src={test} alt="Sorting" />
            <h2>Sorting</h2>
          </div>
        </Link>
        <Link to="/state_machines">
          <div className="grid-item">
            <img src={test} alt="State Machines" />
            <h2>State Machines</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SelectionGrid;

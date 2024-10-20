// src/pages/GraphPage.tsx

import React, { useState, useEffect } from "react";
import GraphVisualiser from "../components/GraphVisualiser";

const GraphPage = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [output, setOutput] = useState([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch tree structure on mount
    useEffect(() => {
        fetch("http://localhost:8000/api/generate_tree/13/")  // Ensure this URL matches the Django path
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); 
            })
            .then(data => {
                setNodes(data.nodes);
                setEdges(data.edges);
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
                setError("Failed to load graph data.");
            });
    }, []);

    // Run BFS algorithm
    const runBFS = () => {
        fetch("http://localhost:8000/api/bfs/1/")
            .then(response => response.json())
            .then(data => setOutput(data.output));
    };

    return (
        <div>
            {error ? <p>Error: {error}</p> : <p>Graph Loaded Successfully</p>}
            <GraphVisualiser nodes={nodes} edges={edges} />
            <button onClick={runBFS}>Run BFS</button>
            <div>
                <h2>Output</h2>
                <ul>
                    {output.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GraphPage;

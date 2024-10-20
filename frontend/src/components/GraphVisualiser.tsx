// src/components/GraphVisualizer.tsx

import * as d3 from "d3";
import React, { useEffect } from "react";

const GraphVisualiser: React.FC<{ nodes: any[], edges: any[] }> = ({ nodes, edges }) => {
    useEffect(() => {
        const svg = d3.select("#graph");
        svg.selectAll("*").remove(); // Clear existing SVG elements

        console.log("Nodes:", nodes);
        console.log("Edges:", edges);

        // Draw the edges
        edges.forEach(edge => {
            const start = nodes.find(node => node.id === edge.start);
            const end = nodes.find(node => node.id === edge.end);

            if (start && end) {
                console.log(`Drawing line from (${start.x}, ${start.y}) to (${end.x}, ${end.y})`);
                svg.append("line")
                    .attr("x1", start.x)  // No multiplication needed, as values are already in the range of the visualizer
                    .attr("y1", start.y)
                    .attr("x2", end.x)
                    .attr("y2", end.y)
                    .attr("stroke", "white")
                    .attr("stroke-width", 2);
            } else {
                console.error(`Start or end node not found for edge: ${edge}`);
            }
        });

        // Draw the nodes
        nodes.forEach(node => {
            svg.append("circle")
                .attr("cx", node.x)
                .attr("cy", node.y)
                .attr("r", 15) // Increase radius for larger nodes
                .attr("fill", "blue");

            svg.append("text")
                .attr("x", node.x)
                .attr("y", node.y)
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .attr("fill", "white")
                .text(node.value); // Display node value as text
        });
    }, [nodes, edges]);

    return <svg id="graph" width="500" height="500"></svg>;
};

export default GraphVisualiser;

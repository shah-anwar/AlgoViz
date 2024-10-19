import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface D3ChartProps {
  data: number[];
}

const D3Chart: React.FC<D3ChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 200;

    svg.attr("width", width).attr("height", height);

    const xScale = d3
      .scaleBand()
      .domain(data.map((_, index) => index.toString()))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 0])
      .range([height, 0]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (_, index) => xScale(index.toString()) || 0)
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d))
      .attr("fill", "blue");
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default D3Chart;

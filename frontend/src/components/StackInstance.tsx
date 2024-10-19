import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import * as d3 from "d3";

const StackInstance: React.FC = () => {
  const { structure } = useParams<{ structure?: string }>();
  const [instanceData, setInstanceData] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [stackItems, setStackItems] = useState<any[]>([]);

  useEffect(() => {
    const createInstance = async () => {
      if (!structure) {
        console.error("Structure is undefined");
        return;
      }

      const postResponse = await fetch(
        `http://localhost:8000/api/data-structures/${structure}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: [] }),
        }
      );

      if (!postResponse.ok) {
        console.error("Failed to create instance:", postResponse.statusText);
        return;
      }

      const getResponse = await fetch(
        `http://localhost:8000/api/data-structures/${structure}/`
      );

      if (!getResponse.ok) {
        console.error("Failed to fetch instance data:", getResponse.statusText);
        return;
      }

      const data = await getResponse.json();
      setInstanceData(data);
      setStackItems(data.items); // Set initial stack items for visualization
    };

    createInstance();
  }, [structure]);

  const handlePush = async () => {
    if (!structure || !instanceData) {
      console.error("Cannot push to an undefined structure or instance data");
      return;
    }

    const response = await fetch(
      `http://localhost:8000/api/data-structures/${structure}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "push", item: inputValue }),
      }
    );

    if (!response.ok) {
      console.error("Failed to push item:", response.statusText);
      return;
    }

    const updatedData = await response.json();
    setInstanceData(updatedData);
    setStackItems(updatedData.items); // Update stack items for visualization
    setInputValue(""); // Clear input after pushing
  };

  const handlePop = async () => {
    if (!structure || !instanceData) {
      console.error("Cannot pop from an undefined structure or instance data");
      return;
    }

    const response = await fetch(
      `http://localhost:8000/api/data-structures/${structure}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "pop" }),
      }
    );

    if (!response.ok) {
      console.error("Failed to pop item:", response.statusText);
      return;
    }

    const updatedData = await response.json();
    setInstanceData(updatedData);
    setStackItems(updatedData.items); // Update stack items for visualization
  };

  const handlePeek = async () => {
    if (!structure || !instanceData) {
      console.error("Cannot peek from an undefined structure or instance data");
      return;
    }

    const response = await fetch(
      `http://localhost:8000/api/data-structures/${structure}/?action=peek`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to peek item:", response.statusText);
      return;
    }

    const peekedData = await response.json();
    alert(`Top item: ${peekedData.item}`);
  };

  // Use React Spring transitions for animating stack items
  const transitions = useTransition(stackItems, {
    from: { opacity: 0, transform: "translateY(50px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(50px)" },
    keys: (item) => item,
  });

  return (
    <div>
      <h1>
        {structure
          ? structure.charAt(0).toUpperCase() + structure.slice(1)
          : "Loading..."}{" "}
        Instance
      </h1>
      {instanceData ? (
        <div className="visualisation-container">
          <svg
            id="stack-visualisation"
            style={{ border: "1px solid black" }}
            width={200}
            height={300}
          >
            {transitions((style, item, t, i) => (
              <animated.rect
                key={item}
                x={10}
                y={300 - (i + 1) * 30}
                width={180}
                height={30}
                fill="steelblue"
                style={style}
              />
            ))}
            {transitions((style, item, t, i) => (
              <animated.text
                key={item}
                x={100}
                y={300 - (i + 1) * 30 + 15}
                dy=".35em"
                textAnchor="middle"
                fill="white"
                style={style}
              >
                {item}
              </animated.text>
            ))}
          </svg>
          <div className="input-container">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value to push"
              className="input" // Add class for styling
            />
            <button onClick={handlePush} className="button">Push</button>
            <button onClick={handlePop} className="button">Pop</button>
            <button onClick={handlePeek} className="button">Peek</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StackInstance;

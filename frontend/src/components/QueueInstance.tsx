import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTransition, animated } from "react-spring";

interface QueueItem {
  id: number;
  value: string;
}

interface InstanceData {
  items: QueueItem[];
}

const QueueInstance: React.FC = () => {
  const { structure } = useParams<{ structure?: string }>();
  const [instanceData, setInstanceData] = useState<InstanceData | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);

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
      setQueueItems(
        data.items.map((item: any, index: number) => ({
          id: index,
          value: item,
        }))
      ); // Ensure items have unique IDs
    };

    createInstance();
  }, [structure]);

  const handleEnqueue = async () => {
    if (!structure || !instanceData) {
      console.error(
        "Cannot enqueue to an undefined structure or instance data"
      );
      return;
    }

    const response = await fetch(
      `http://localhost:8000/api/data-structures/${structure}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "enqueue", item: inputValue }),
      }
    );

    if (!response.ok) {
      console.error("Failed to enqueue item:", response.statusText);
      return;
    }

    const updatedData = await response.json();
    setInstanceData(updatedData);
    setQueueItems(
      updatedData.items.map((item: any, index: number) => ({
        id: index,
        value: item,
      }))
    ); // Update queueItems with unique IDs
    setInputValue(""); // Clear input after enqueue
  };

  const handleDequeue = async () => {
    if (!structure || !instanceData) {
      console.error(
        "Cannot dequeue from an undefined structure or instance data"
      );
      return;
    }

    const response = await fetch(
      `http://localhost:8000/api/data-structures/${structure}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "dequeue" }),
      }
    );

    if (!response.ok) {
      console.error("Failed to dequeue item:", response.statusText);
      return;
    }

    const updatedData = await response.json();
    setInstanceData(updatedData);
    setQueueItems(
      updatedData.items.map((item: any, index: number) => ({
        id: index,
        value: item,
      }))
    ); // Update queueItems with unique IDs
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
    alert(`Front item: ${peekedData.item}`);
  };

  const transitions = useTransition(queueItems, {
    from: { opacity: 0, transform: "translateX(50px)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(-50px)" },
    keys: (item) => item.id,
  });

  const gap = 10;

  return (
    <div>
      <h1>
        {structure
          ? structure.charAt(0).toUpperCase() + structure.slice(1)
          : "Loading..."}{" "}
        Instance
      </h1>
      {instanceData ? (
        <div>
          <svg
            id="queue-visualisation"
            style={{ border: "1px solid black" }}
            width={600} // Increase width to accommodate the gap
            height={100}
          >
            {transitions((style, item) => (
              <animated.g key={item.id} style={style}>
                <animated.rect
                  x={item.id * (80 + gap) + gap} // Adjust x position for gap
                  y={20} // Y position
                  width={80} // Width of the rectangle
                  height={60} // Height of the rectangle
                  fill="steelblue" // Fill color
                  rx={10} // Rounded corners
                  ry={10} // Rounded corners
                />
                <animated.text
                  x={item.id * (80 + gap) + gap + 40} // Center the text in the rectangle
                  y={20 + 30} // Centered vertically in the rectangle
                  dy=".35em"
                  textAnchor="middle"
                  fill="white"
                >
                  {item.value}
                </animated.text>
              </animated.g>
            ))}
          </svg>
          <div style={{ marginTop: "20px" }}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value to enqueue"
            />
            <button onClick={handleEnqueue}>Enqueue</button>
            <button onClick={handleDequeue}>Dequeue</button>
            <button onClick={handlePeek}>Peek</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QueueInstance;

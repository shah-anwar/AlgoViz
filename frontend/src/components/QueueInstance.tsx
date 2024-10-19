import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QueueInstance: React.FC = () => {
  const { structure } = useParams<{ structure?: string }>();
  console.log("Selected structure:", structure);
  const [instanceData, setInstanceData] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");

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

      console.log("POST response status:", postResponse.status);
      if (!postResponse.ok) {
        console.error("Failed to create instance:", postResponse.statusText);
        return;
      }

      const getResponse = await fetch(
        `http://localhost:8000/api/data-structures/${structure}/`
      );
      console.log("GET response status:", getResponse.status);

      if (!getResponse.ok) {
        console.error("Failed to fetch instance data:", getResponse.statusText);
        return;
      }

      const data = await getResponse.json();
      console.log("Fetched instance data:", data);
      setInstanceData(data);
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
    console.log("Updated instance data after enqueue:", updatedData);
    setInstanceData(updatedData);
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
    console.log("Updated instance data after dequeue:", updatedData);
    setInstanceData(updatedData);
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
          <h2>Current Queue:</h2>
          <ul>
            {instanceData.items.map((item: any, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value to enqueue"
          />
          <button onClick={handleEnqueue}>Enqueue</button>
          <button onClick={handleDequeue}>Dequeue</button>
          <button onClick={handlePeek}>Peek</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QueueInstance;

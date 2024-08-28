import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const url = "http://localhost:4000";

function DataCreator({ isAuthenticated }) {
  const [data, setData] = useState([]);
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");

  // Функция за създаване на нови данни
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("You must be logged in to create data.");
      return;
    }

    try {
      const response = await fetch(`${url}/data/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field1, field2 }),
        credentials: "include", // Важно за изпращане на кукитата
      });

      if (response.ok) {
        const newData = await response.json();
        setData((prevData) => [...prevData, newData]);
        setField1("");
        setField2("");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Функция за извличане на данните от базата данни
  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/data`, {
        method: "GET",
        credentials: "include", // Важно за изпращане на кукитата
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="data-creator">
      <h2>Create Data</h2>
      <form onSubmit={handleCreate}>
        <label>
          Field 1:
          <input
            type="text"
            value={field1}
            onChange={(e) => setField1(e.target.value)}
            placeholder="Enter first field"
            required
          />
        </label>
        <br />
        <label>
          Field 2:
          <input
            type="text"
            value={field2}
            onChange={(e) => setField2(e.target.value)}
            placeholder="Enter second field"
            required
          />
        </label>
        <br />
        <button type="submit">Create Data</button>
      </form>

      <h3>Existing Data</h3>
      <ul>
        {/* {data.map((item, index) => (
          <li key={index}>{`${item.field1} - ${item.field2}`}</li>
        ))} */}
        {data.map((item, index) => (
          <li key={index}>
            {`${item.field1} - ${item.field2} (by ${
              item.author?.email || "Unknown"
            })`}
          </li>
        ))}
      </ul>
    </div>
  );
}

DataCreator.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default DataCreator;

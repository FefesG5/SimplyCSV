import { useState } from "react";
import styles from "./DataEntry.module.css";

const DataEntry = () => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [csvData, setCsvData] = useState("");

  const handleProcess = () => {
    // Split the textarea value by lines and filter out any entirely empty lines
    const lines = textAreaValue
      .split("\n")
      .filter((line) => line.trim() !== "");

    lines.shift();
    console.log(lines);
    // Initialize arrays for keys and values
    let keys = [];
    let values = [];

    // Loop over the remaining array elements to build the keys and values arrays
    for (let i = 0; i < lines.length; i += 2) {
      // Remove any leading numbers and special characters (like '１）') from the keys
      keys.push(`"${lines[i].replace(/^(\d+）)/, "").trim()}"`);
      values.push(`"${lines[i + 1].trim()}"`);
    }

    // Combine keys and values into CSV format
    const csvContent = keys.join(",") + "\n" + values.join(",");
    setCsvData(csvContent);
  };

  const handleDownload = () => {
    console.log("Downloading..."); // Debug line to confirm function call

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
  };
  return (
    <div className={styles.dataEntryContainer}>
      <textarea
        className={styles.textArea}
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
      ></textarea>
      <div>
        <button className={styles.button} type="button" onClick={handleProcess}>
          Process
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={handleDownload}
          disabled={!csvData}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default DataEntry;

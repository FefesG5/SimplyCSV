import { useState } from "react";
import styles from "./DataEntry.module.css";

const DataEntry = () => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [csvData, setCsvData] = useState("");
  const [keysStored, setKeysStored] = useState<string[]>([]);

  const handleProcess = () => {
    // Filter out lines starting with "#" in addition to empty lines
    const lines = textAreaValue
      .split("\n")
      .filter((line) => line.trim() !== "" && !line.trim().startsWith("#"));

    let keys = [];
    let values = [];

    for (let i = 0; i < lines.length; i += 2) {
      const key = lines[i].replace(/^(\d+）)/, "").trim();
      // Ensure lines[i + 1] exists before accessing it
      const value = lines[i + 1]
        ? lines[i + 1].trim() === "-"
          ? ""
          : lines[i + 1].trim()
        : "";

      if (!keysStored.includes(key)) {
        keys.push(`"${key}"`);
        setKeysStored((prevKeys) => [...prevKeys, key]);
      }
      values.push(`"${value}"`);
    }

    // Combine keys and values into CSV format
    const newCsvContent = keys.length > 0 ? keys.join(",") + "\n" : "";
    const csvContent = csvData
      ? csvData + values.join(",") + "\n"
      : keys.join(",") + "\n" + values.join(",") + "\n";
    setCsvData(csvContent);
  };

  const handleDownload = () => {
    console.log("Downloading...");

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

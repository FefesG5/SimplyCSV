import { useState } from "react";
import styles from "./DataEntry.module.css";

const DataEntry = () => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [csvData, setCsvData] = useState("");
  const [keysStored, setKeysStored] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleProcess = () => {
    setIsLoading(true);
    setSuccessMessage("");

    const lines = textAreaValue
      .split("\n")
      .filter(
        (line) =>
          line.trim() !== "" &&
          !line.trim().startsWith("#") &&
          !line.trim().startsWith("No"),
      );

    let keys = [];
    let values = [];

    for (let i = 0; i < lines.length; i += 2) {
      const key = lines[i].replace(/^(\d+）)/, "").trim();
      const value = lines[i + 1]
        ? lines[i + 1].trim() === "-"
          ? ""
          : lines[i + 1].trim()
        : "";

      if (!csvData && !keysStored.includes(key)) {
        keys.push(`"${key}"`);
      }

      if (!keysStored.includes(key)) {
        setKeysStored((prevKeys) => [...prevKeys, key]);
      }
      values.push(`"${value}"`);
    }

    const valuesCsvContent = values.join(",") + "\n";
    const csvContent =
      !csvData && keys.length > 0
        ? keys.join(",") + "\n" + valuesCsvContent
        : csvData + valuesCsvContent;

    setCsvData(csvContent);
    setTextAreaValue("");
    setIsLoading(false);
    setSuccessMessage(
      "Data processed successfully. Ready to add more or download.",
    );
  };

  const handleDownload = () => {
    console.log("Downloading...");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
  };

  const handleClearData = () => {
    setCsvData("");
    setKeysStored([]);
    setSuccessMessage("");
  };

  return (
    <div className={styles.dataEntryContainer}>
      <textarea
        className={styles.textArea}
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
        placeholder="Enter your data here..."
      ></textarea>
      {isLoading && <p>Processing...</p>}
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      {csvData && (
        <div className={styles.preview}>
          <strong>CSV Data Preview:</strong>
          <br />
          {csvData}
        </div>
      )}
      <div>
        <button
          className={styles.button}
          type="button"
          onClick={handleProcess}
          disabled={!textAreaValue}
        >
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
        <button
          className={styles.button}
          type="button"
          onClick={handleClearData}
          disabled={!csvData}
        >
          Clear Data
        </button>
      </div>
    </div>
  );
};

export default DataEntry;

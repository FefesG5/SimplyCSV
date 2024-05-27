import { useState } from "react";
import sampleData from "@/utils/sampleData";
import styles from "./Home.module.css";

export default function Home() {
  const [copyStatus, setCopyStatus] = useState("Copy Sample Data");

  const handleCopySampleData = () => {
    navigator.clipboard.writeText(sampleData).then(() => {
      setCopyStatus("Copied ✓");
      setTimeout(() => setCopyStatus("Copy Sample Data"), 2000);
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Simply CSV</h1>
      <div className={styles.sampleDataContainer}>
        <h2>Sample Data</h2>
        <div className={styles.sampleData}>{sampleData}</div>
        <button className={styles.copyButton} onClick={handleCopySampleData}>
          {copyStatus}
        </button>
      </div>
    </div>
  );
}

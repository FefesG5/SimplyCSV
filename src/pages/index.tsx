import { useState } from "react";
import styles from "./Home.module.css";

const sampleData = `
#16
作成日時
2024年2月15日(木) 09:30

１）お子様の名前
テスト高槻

お子様の名前（フリガナ）
テストタカツキ

２）ご希望の日程
3月21日(木) 午前

３）延長をご希望ですか
希望しない

延長時間をご記入ください
-

４）お弁当をご希望ですか
希望しない

お弁当ご希望日
-

５）送迎をご希望ですか
希望しない

送迎ご希望日
-

送迎場所を教えてください。
-

５）メールアドレスをご記入ください
tryanglekidsm@gmail.com

６)自由記入欄
テスト
`;

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
        <pre className={styles.sampleData}>{sampleData}</pre>
        <button className={styles.copyButton} onClick={handleCopySampleData}>
          {copyStatus}
        </button>
      </div>
    </div>
  );
}

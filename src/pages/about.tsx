import styles from "./about.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.container} data-testid="about-main-content">
      <h2 className={styles.heading}>Welcome to Simply CSV!</h2>
      <p className={styles.paragraph}>
        This intuitive tool is designed to make your data entry tasks simpler
        and more efficient. Here's how to get started:
      </p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong>Enter Your Data:</strong> Begin by pasting your data into the
          large text area on the main page. If you have data that should be
          ignored, ensure it starts with "#" or "No".
        </li>
        <li className={styles.listItem}>
          <strong>Process Your Data:</strong> Once your data is entered, click
          the "Process" button. Our app will then organize your data into a CSV
          format. You can see a preview of your CSV data once it finished
          processing.
        </li>
        <li className={styles.listItem}>
          <strong>Download Your CSV:</strong> After processing, you can download
          your CSV file by clicking the "Download CSV" button. This file will
          contain all the data you've entered, formatted and ready for any
          application.
        </li>
        <li className={styles.listItem}>
          <strong>Clear Data:</strong> If you need to start over or enter new
          data, simply click the "Clear Data" button to reset the application.
        </li>
      </ul>

      <h3 className={styles.subheading}>使い方</h3>
      <p className={styles.paragraph}>
        Simply
        CSVへようこそ!この直感的なツールは、あなたのデータ入力作業をより簡単で効率的にするために設計されています。使い始めるには、以下の手順に従ってください:
      </p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong>データを入力する：</strong>
          メインページの大きなテキストエリアに、データを貼り付けて開始します。無視すべきデータがある場合は、それが
          "#" または "No" で始まるようにしてください。
        </li>
        <li className={styles.listItem}>
          <strong>データを処理する：</strong>
          データの入力が完了したら、「処理」ボタンをクリックします。アプリがデータを
          CSV 形式で整理します。処理が完了すると、CSV
          データのプレビューを見ることができます。
        </li>
        <li className={styles.listItem}>
          <strong>CSV をダウンロードする：</strong>処理後、"Download CSV"
          ボタンをクリックして CSV
          ファイルをダウンロードできます。このファイルには、入力されたすべてのデータがフォーマットされて含まれています。
        </li>
        <li className={styles.listItem}>
          <strong>データをクリアする：</strong>
          新しいデータを入力するか、最初からやり直す必要がある場合は、"Clear
          Data" ボタンをクリックしてアプリケーションをリセットしてください。
        </li>
      </ul>
    </div>
  );
};

export default About;

import styles from "./Home.module.css";
import DataEntry from "@/components/DataEntry/DataEntry";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Simply CSV</h1>
      <DataEntry />
    </div>
  );
}

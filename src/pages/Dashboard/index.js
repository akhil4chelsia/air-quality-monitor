import React, { useState } from "react";
import styles from "./index.module.scss";
import AirQualityDataTable from "../../components/AirQualityDataTable";
import AirQualityStats from "../../components/AirQualityStats";
import AirQualityLiveStat from "../../components/AirQualityLiveStat";

export default function Dashboard() {
  const [city, setCity] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.table}>
          <AirQualityDataTable onRowClick={setCity} />
        </div>
        <div className={styles.summary}>
          <AirQualityLiveStat city={city} />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <AirQualityStats />
      </div>
    </div>
  );
}

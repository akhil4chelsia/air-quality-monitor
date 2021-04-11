import React from "react";
import styles from "./index.module.scss";
export default function Header() {
  return (
    <>
      <header>
        <div className={styles.container}>
          <div className={styles.title}>Air Quality Monitor</div>
        </div>
      </header>
    </>
  );
}

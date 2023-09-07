import { Footer } from "@components/index";
import styles from "./root.module.css";
import { useEffect } from "react";
import { validateCSV } from "@services/validate-csv.service";

export const Root = () => {
  useEffect(() => {
    (async () => {
      await validateCSV();
    })();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Shooper Fullstack Challenge</h1>
      <p>
        This project is the implementation of a full stack challenge from{" "}
        <a
          href="https://landing.shopper.com.br/"
          target="_blank"
          rel="noopener"
          className={styles.link}
        >
          Shopper
        </a>
        .
      </p>
      <div className={styles.infoContainer}>
        <h2>Technologies used:</h2>
        <p className={styles.paragraph}>Frontend: React + Typescript + Vite</p>
        <p className={styles.paragraph}>
          Backend: NodeJS + Typescript + Express
        </p>
      </div>
      <Footer />
    </main>
  );
};

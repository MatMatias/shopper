import { useState } from "react";

import { validateCSVAndGetProductsToBeUpdated } from "@services/validate-csv.service";
import { Footer } from "@components/index";
import { Dropzone } from "@features/index";
import styles from "./root.module.css";

export const Root = () => {
  const [file, setFile] = useState<File | undefined>();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Shopper Fullstack Challenge</h1>
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
      <section className={styles.dropzoneSection}>
        <Dropzone file={file} setFile={setFile} />
        <div>
          <button
            disabled={!file}
            onClick={async () => {
              try {
                console.log(await validateCSVAndGetProductsToBeUpdated(file!));
              } catch (error) {
                console.error(error);
                alert(
                  "An unexpected error ocurred when validating the CSV file. Check console for more details"
                );
              }
            }}
          >
            Validate
          </button>
          <button onClick={() => setFile(undefined)}>Clear</button>
        </div>
      </section>
      <Footer />
    </main>
  );
};

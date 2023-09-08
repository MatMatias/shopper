import type { ProductWithErrors } from "@models/interfaces";

import { Fragment, useEffect, useState } from "react";

import {
  validateCSVAndGetProductsToBeUpdated,
  updatePrice,
} from "@services/index";
import { Footer } from "@components/index";
import { Dropzone, ProductsTable } from "@features/index";
import styles from "./root.module.css";

export const Root = () => {
  const [file, setFile] = useState<File | undefined>();
  const [parsedProducts, setParsedProducts] = useState<ProductWithErrors[]>([]);
  const [areThereAnyErrorsInProducts, setAreThereAnyErrorsInProducts] =
    useState<boolean>(false);

  useEffect(() => {
    let _areThereAnyErrorsInProducts = false;
    parsedProducts.forEach((product) => {
      if (product.errors.length > 0) {
        _areThereAnyErrorsInProducts = true;
      }
    });

    setAreThereAnyErrorsInProducts(_areThereAnyErrorsInProducts);
  }, [parsedProducts]);

  const cleanUp = () => {
    setParsedProducts([]);
    setFile(undefined);
  };

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
      {parsedProducts.length === 0 ? (
        <Fragment>
          <div className={styles.infoContainer}>
            <h2>Technologies used:</h2>
            <p className={styles.paragraph}>
              Frontend: React + Typescript + Vite
            </p>
            <p className={styles.paragraph}>
              Backend: NodeJS + Typescript + Express
            </p>
            <p className={styles.paragraph}>Database: MySQL 8</p>
          </div>
          <section className={styles.dropzoneSection}>
            <Dropzone file={file} setFile={setFile} />
            <div className={styles.buttonGroup}>
              <button
                disabled={!file}
                onClick={async () => {
                  try {
                    const _parsedProducts =
                      await validateCSVAndGetProductsToBeUpdated(file!);

                    if (areThereAnyErrorsInProducts) {
                      ("One or more products in the CSV did not attend all policies");
                    }
                    setParsedProducts(_parsedProducts);
                  } catch (error) {
                    console.error(error);
                    alert(
                      "An unexpected error ocurred when validating the CSV file. Check console for more details"
                    );
                  }
                }}
                className={!file ? "primary-button-disabled" : "primary-button"}
              >
                <span className="primary-button-disabled-tooltip">
                  Upload a file to validate
                </span>
                Validate
              </button>
              <button
                className={"secondary-button-outline"}
                onClick={() => setFile(undefined)}
              >
                Clear
              </button>
            </div>
          </section>
        </Fragment>
      ) : (
        <Fragment>
          <h2>Products from CSV:</h2>
          <section className={styles.tableSection}>
            <ProductsTable parsedProducts={parsedProducts} />
            <div className={styles.buttonGroup}>
              <button
                className={
                  areThereAnyErrorsInProducts
                    ? "primary-button-disabled"
                    : "primary-button"
                }
                disabled={areThereAnyErrorsInProducts}
                onClick={async () => {
                  const updatePricePromises = parsedProducts.map(
                    async (product) =>
                      updatePrice(product.code, product.new_price)
                  );
                  try {
                    await Promise.all(updatePricePromises);
                    alert("Prices updated successfully");
                    cleanUp();
                  } catch (error) {
                    console.error(error);
                    alert(
                      "One or more product price could not be updated. Check console for details"
                    );
                  }
                }}
              >
                Update prices
                <span className="primary-button-disabled-tooltip">
                  There are errors on one or more products
                </span>
              </button>
              <button
                className="secondary-button-outline"
                onClick={() => {
                  cleanUp();
                }}
              >
                Upload new CSV
              </button>
            </div>
          </section>
        </Fragment>
      )}
      <Footer />
    </main>
  );
};

import type { ProductWithErrors } from "@models/interfaces";

import { Fragment } from "react";
import styles from "./products-table.module.css";

interface Props {
  parsedProducts: ProductWithErrors[];
}

export const ProductsTable = ({ parsedProducts }: Props) => {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th className={styles.bigHeadCell}>Name</th>
            <th>New Price</th>
            <th>Current Price</th>
            <th className={styles.bigHeadCell}>Errors</th>
          </tr>
        </thead>
        <tbody>
          {parsedProducts.map((product) => {
            return (
              <tr key={product.code}>
                <td>{product.code}</td>
                <td className={styles.bigBodyCell}>{product.name}</td>
                <td className={styles.cell}>
                  R$ {product.new_price.toFixed(2).replace(".", ",")}
                </td>
                <td className={styles.cell}>
                  R$ {product.sales_price.toFixed(2).replace(".", ",")}
                </td>
                <td className={styles.bigBodyCell}>
                  {product.errors.map((error) => {
                    return (
                      <Fragment>
                        {error}
                        <br />
                      </Fragment>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

import type { ProductWithErrors } from "@models/interfaces";

import { Fragment } from "react";

interface Props {
  parsedProducts: ProductWithErrors[];
}

export const ProductsTable = ({ parsedProducts }: Props) => {
  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>New Price</th>
            <th>Current Price</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>
          {parsedProducts.map((product) => {
            return (
              <tr key={product.code}>
                <td>{product.code}</td>
                <td style={{ textAlign: "left" }}>{product.name}</td>
                <td>{product.new_price}</td>
                <td>{product.sales_price}</td>
                <td style={{ textAlign: "left" }}>
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
    </Fragment>
  );
};

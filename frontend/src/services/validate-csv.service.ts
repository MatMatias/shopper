import type { ProductWithErrors } from "@models/interfaces";

import { WEBSERVICE_BASE_URL } from "@http/base-url";
import { Endpoints } from "@http/endpoints";

export async function validateCSVAndGetProductsToBeUpdated(
  csvFile: File
): Promise<ProductWithErrors[]> {
  const formData = new FormData();
  const fileInput = csvFile;
  formData.append("file", fileInput);

  const response = await fetch(`${WEBSERVICE_BASE_URL}/${Endpoints.Validate}`, {
    method: "POST",
    body: formData,
  });

  const responseJSON = await response.json();
  const productsToBeUpdated: ProductWithErrors[] =
    responseJSON.data as ProductWithErrors[];

  return productsToBeUpdated;
}

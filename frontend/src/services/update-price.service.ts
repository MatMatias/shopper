import { WEBSERVICE_BASE_URL } from "@http/base-url";
import { Endpoints } from "@http/endpoints";

export async function updatePrice(
  productCode: number,
  newPrice: number
): Promise<void> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = { new_price: newPrice };

  await fetch(`${WEBSERVICE_BASE_URL}/${Endpoints.Products}/${productCode}`, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(body),
  });
}

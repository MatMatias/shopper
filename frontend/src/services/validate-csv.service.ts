import { WEBSERVICE_BASE_URL } from "@http/base-url";
import { Endpoints } from "@http/endpoints";

export async function validateCSV() {
  const response = await fetch(`${WEBSERVICE_BASE_URL}/${Endpoints.Validate}`, {
    method: "POST",
  });

  const responseJSON = await response.json();

  console.log(responseJSON);
}

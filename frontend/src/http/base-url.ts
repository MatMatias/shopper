function getBaseURLFromMode(): string {
  const deploymentMode = import.meta.env.MODE;
  if (deploymentMode === "development") {
    const webserviceBaseURL = `http://${import.meta.env.VITE_LOCAL_API_URL}:${
      import.meta.env.VITE_LOCAL_API_PORT
    }`;

    return webserviceBaseURL;
  } else {
    const webserviceBaseURL = `https://${import.meta.env.VITE_PROD_API_URL}`;

    return webserviceBaseURL;
  }
}

export const WEBSERVICE_BASE_URL = getBaseURLFromMode();

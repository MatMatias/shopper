import { ExpressServer } from "@src/server";
import "module-alias/register";

(async () => {
  const SERVER_PORT = Number.parseInt(process.env.PORT ?? "3000");
  try {
    const expressServer: ExpressServer = new ExpressServer();
    expressServer.listen(SERVER_PORT);
  } catch (error) {
    console.error("An error ocurred while intiliazing the server:", error);
  }
})();

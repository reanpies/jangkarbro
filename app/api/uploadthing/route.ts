import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: 'wr7ucpooxr',
    uploadthingSecret: process.env.UPLOADTHING_TOKEN
  }
});
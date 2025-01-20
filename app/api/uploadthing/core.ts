import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1
    }
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions);
      if (!session) throw new Error("Unauthorized");
      
      return { userId: session.user?.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        url: file.url,
        key: file.key,
        uploadedBy: metadata.userId
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
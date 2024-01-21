import { useSession } from "sst/node/auth";
import { ApiHandler } from "sst/node/api";

export const authValidator = (lambdaFunc: any) =>
  ApiHandler(async (event) => {
    const session = useSession();

    // Check user is authenticated
    if (session.type !== "user") {
      throw new Error("Not authenticated");
    }

    return lambdaFunc(event, session);
  });

import { Api, Auth, StackContext, NextjsSite, use } from "sst/constructs";

import { StorageStack } from "./StorageStack";

const GOOGLE_CLIENT_ID = "787079507186-m4aq8fdu6q94m0driov4g14f7283idja.apps.googleusercontent.com"; // Replace here

export function AppStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /session": "packages/functions/src/auth/session.handler",
      "POST /tasks": "packages/functions/src/tasks/create.main",
      "GET /tasks": "packages/functions/src/tasks/list.main",
      "GET /tasks/{id}": "packages/functions/src/tasks/get.main",
      "PATCH /tasks/{id}": "packages/functions/src/tasks/update.main",
      "DELETE /tasks/{id}": "packages/functions/src/tasks/delete.main",
    },
  });

  // Create the frontend
  const site = new NextjsSite(stack, "site", {
    path: "packages/web",
    environment: {
      API_URL: api.url,
    },
  });

  // Auth handler
  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth/main.handler",
      bind: [site],
      environment: {
        GOOGLE_CLIENT_ID,
      },
    },
  });

  // A session token is generated by visiting /auth/:adapter/authorize,
  // where :adapter is one of the keys under providers when creating an AuthHandler.
  auth.attach(stack, {
    api,
    prefix: "/auth",
  });

  // Show the endpoints in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: site.url,
  });

  // Return the API resource
  return {
    api,
  };
}

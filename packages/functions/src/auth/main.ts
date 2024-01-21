import * as uuid from "uuid";
import { Table } from "sst/node/table";
import { StaticSite } from "sst/node/site";
import { AuthHandler, GoogleAdapter, Session } from "sst/node/auth";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const FRONTEND_URL = process.env.IS_LOCAL ?  "http://localhost:3000" : StaticSite.site.url;

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userId: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();

        // A unique uuid
        const userId = uuid.v1();
        
        // TODO: Search for existing record by `externalUserId` and use it if it exists
        // TODO: Setup GSI for this
        const ddb = new DynamoDBClient({});
        await ddb.send(
          new PutItemCommand({
            TableName: Table.App.tableName,
            Item: marshall({
              pk: `USER#${userId}`,
              sk: 'PROFILE',
              provider: 'google',
              userId,
              externalUserId: claims.sub,
              email: claims.email,
              emailVerified: claims.email_verified,
              picture: claims.picture,
              name: claims.name,
              givenName: claims.given_name,
              familyName: claims.family_name,
              locale: claims.locale,
            }),
          })
        );

        return Session.parameter({
          redirect: FRONTEND_URL,
          type: "user",
          properties: {
            userId,
          },
        });
      },
    }),
  },
});

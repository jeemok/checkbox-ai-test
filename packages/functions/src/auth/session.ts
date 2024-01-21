import { Session } from "types/auth";
import { Table } from "sst/node/table";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { authValidator } from "src/helper/authValidator";

export const handler = authValidator(
  async (
    event: APIGatewayProxyEvent,
    session: Session
  ): Promise<APIGatewayProxyResult> => {
    const ddb = new DynamoDBClient({});
    const data = await ddb.send(
      new GetItemCommand({
        TableName: Table.App.tableName,
        Key: marshall({
          pk: `USER#${session?.properties?.userId}`,
          sk: "PROFILE",
        }),
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(unmarshall(data.Item!)),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
);

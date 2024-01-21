import { Table } from "sst/node/table";
import dynamoDb from "@checkbox-ai-test/core/dynamodb";
import { authValidator } from "src/helper/authValidator";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Session } from "types/auth";

export const main = authValidator(
  async (
    event: APIGatewayProxyEvent,
    session: Session
  ): Promise<APIGatewayProxyResult> => {
    const params = {
      TableName: Table.App.tableName,
      Key: {
        pk: `USER#${session?.properties?.userId}`,
        sk: `TASK#${event?.pathParameters?.id}`,
      },
    };

    const result = await dynamoDb.get(params);
    if (!result.Item) {
      throw new Error("Item not found.");
    }

    // Return the retrieved item
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
);

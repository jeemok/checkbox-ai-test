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

    await dynamoDb.delete(params);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: true }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
);

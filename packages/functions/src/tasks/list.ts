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
      KeyConditionExpression: "pk = :userId AND begins_with(sk, :tagId)",
      ExpressionAttributeValues: {
        ":userId": `USER#${session?.properties?.userId}`,
        ":tagId": "TASK#", // find all tasks
      },
    };

    const result = await dynamoDb.query(params);

    // Return the matching list of items in response body
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
);

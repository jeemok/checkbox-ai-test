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
    // Check if the item exists
    const exists = await dynamoDb.get({
      TableName: Table.App.tableName,
      Key: {
        pk: `USER#${session?.properties?.userId}`,
        sk: `TASK#${event?.pathParameters?.id}`,
      },
    });
    if (!exists.Item) {
      throw new Error("Item not found.");
    }

    // Retrieve the desired fields for update
    const body = JSON.parse(event.body || "{}");
    const keys = Object.keys(body);
    // Only update the provided fields
    const updateExpression = keys.map((key) => `${key} = :${key}`).join(", ");
    const expressionAttributeValues = keys.reduce((acc, key) => {
      acc[`:${key}`] = body[key];
      return acc;
    }, Object.assign({}));

    const params = {
      TableName: Table.App.tableName,
      Key: {
        pk: `USER#${session?.properties?.userId}`,
        sk: `TASK#${event?.pathParameters?.id}`,
      },
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeValues: expressionAttributeValues,
      // Returns all attributes of the item after the update
      ReturnValues: "ALL_NEW",
    };

    const data = await dynamoDb.update(params);

    // Return the matching list of items in response body
    return {
      statusCode: 200,
      body: JSON.stringify({ status: true, updated: data?.Attributes }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
);

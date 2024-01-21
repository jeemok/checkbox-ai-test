import * as uuid from "uuid";
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
    let data;

    if (event.body != null) {
      // Request body is passed in as a JSON encoded string in 'event.body'
      data = JSON.parse(event.body);
    }

    // A unique uuid
    const taskId = uuid.v1();
    const userId = session?.properties?.userId;

    const params = {
      TableName: Table.App.tableName,
      Item: {
        pk: `USER#${userId}`,
        sk: `TASK#${taskId}`,
        // The attributes of the item to be created
        taskId,
        userId,
        // Parsed from request body
        title: data.title,
        description: data.description,
        dueAt: data.dueAt,
        createdAt: Date.now(), // Current Unix timestamp
      },
    };

    await dynamoDb.put(params);

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
);

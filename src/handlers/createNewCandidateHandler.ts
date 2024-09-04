import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "empathix-candidates";

export const handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };

    try {

        let requestJSON = JSON.parse(event.body);
        await dynamo.send(
            new PutCommand({
                TableName: tableName,
                Item: {
                    userId: requestJSON.userId,
                    fullName: requestJSON.fullName,
                    email: requestJSON.email,
                    status: requestJSON.status,
                },
            })
        );
        body = `Created item ${requestJSON.userId}`;
    }
    catch (err) {
        statusCode = 400;
        body = err.message;
    }
    finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};

const AWS = require("aws-sdk");

exports.handler = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: "cube-cafe-data",
    };

    const data = await dynamodb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `An error occurred while fetching the data: ${error}` }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
    };
  }
};

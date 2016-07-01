module.exports = {
    tables: [
        {
            definition: {
                TableName: "Prediction",
                KeySchema: [
                    {AttributeName: "EventId", KeyType: "HASH"},  //Partition key
                    {AttributeName: "UserId", KeyType: "RANGE"}  //Sort key
                ],
                AttributeDefinitions: [
                    {AttributeName: "EventId", AttributeType: "S"},
                    {AttributeName: "UserId", AttributeType: "S"}
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                }
            },
            data: {
                RequestItems: {
                    "Prediction": [
                        {
                            PutRequest: {
                                Item: {
                                    "EventId": {"S": "NFL#2016-02-07T23:25:00+00:00#Levis Stadium#Arizona@Denver"},
                                    "UserId": {"S": "facebook|10208601241532203"},
                                    "AwayScore": {"N": "20"},
                                    "HomeScore": {"N": "17"},
                                    "PredictorLocation": {"S": "47.6023590,-122.3365170"},
                                    "PredictedDateTime": {"S": "2016-01-20T01:18:42+00:00"}
                                }
                            }
                        },
                        {
                            PutRequest: {
                                Item: {
                                    "EventId": {"S": "NFL#2016-02-07T23:25:00+00:00#Levis Stadium#Arizona@Denver"},
                                    "UserId": {"S": "twitter|20527403"},
                                    "AwayScore": {"N": "24"},
                                    "HomeScore": {"N": "28"},
                                    "PredictorLocation": {"S": "47.6739880,-122.1215120"},
                                    "PredictedDateTime": {"S": "2016-01-20T01:26:58+00:00"}
                                }
                            }
                        }
                    ]
                }
            }
        }
    ]
};
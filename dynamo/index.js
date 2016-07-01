'use strict'

var AWS = require('aws-sdk'),
    tables = require('./definitions').tables;

AWS.config.update({
    region: process.env['AWS_REGION'],
    endpoint: process.env['DYNAMODB_ENDPOINT']
});

console.log(process.env.AWS_REGION);
console.log(process.env.DYNAMODB_ENDPOINT);

var dynamodb = new AWS.DynamoDB();


//dynamodb.deleteTable({TableName: tables[0].definition.TableName}, function (err, data) {
//    if (err) {
//        console.log(JSON.stringify(err, null, 2));
//    } else {
//        console.log(JSON.stringify(data, null, 2));
//        dynamodb.createTable(tables[0].definition, function (err, data) {
//            if (err) {
//                console.log(JSON.stringify(err, null, 2));
//            } else {
//                console.log(JSON.stringify(data, null, 2));
//                dynamodb.batchWriteItem(tables[0].data, function (err, data) {
//                    if (err) {
//                        console.log(JSON.stringify(err, null, 2));
//                    } else {
//                        console.log(JSON.stringify(data, null, 2));
//                    }
//                });
//            }
//        });
//    }
//});


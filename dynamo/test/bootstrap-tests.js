'use strict'

var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect,
    AWS = require('aws-sdk'),
    tables = require('../definitions').tables;

chai.use(sinonChai);

const PREDICTION_TABLE = "Prediction";

AWS.config.update({
    region: process.env['AWS_REGION']
});

var dynamodb = new AWS.DynamoDB();

describe("PCSM DynamoDB Bootstrap Tests", function () {

    before(function (done) {
        dynamodb.deleteTable({TableName: PREDICTION_TABLE}, function (err, data) {
            done();
        });
    });

    it("Creates the Prediction table", function (done) {
        var now = Date.now() - 10000;

        dynamodb.createTable(tables[0].definition, function (err, data) {
            expect(err).to.not.exist;
            expect(data).to.be.an('object');
            expect(data.TableDescription).to.have.property("AttributeDefinitions");
            expect(data.TableDescription.AttributeDefinitions.length).to.equal(2);
            expect(data.TableDescription.AttributeDefinitions[0]).to.have.property("AttributeName", "EventId");
            expect(data.TableDescription.AttributeDefinitions[0]).to.have.property("AttributeType", "S");
            expect(data.TableDescription.AttributeDefinitions[1]).to.have.property("AttributeName", "UserId");
            expect(data.TableDescription.AttributeDefinitions[1]).to.have.property("AttributeType", "S");
            expect(data.TableDescription).to.have.property("TableName", "Prediction");
            expect(data.TableDescription).to.have.property("KeySchema");
            expect(data.TableDescription.KeySchema.length).to.equal(2);
            expect(data.TableDescription.KeySchema[0]).to.have.property("AttributeName", "EventId");
            expect(data.TableDescription.KeySchema[0]).to.have.property("KeyType", "HASH");
            expect(data.TableDescription.KeySchema[1]).to.have.property("AttributeName", "UserId");
            expect(data.TableDescription.KeySchema[1]).to.have.property("KeyType", "RANGE");
            //expect(data.TableDescription).to.have.property("TableStatus", "ACTIVE");
            expect(data.TableDescription).to.have.property("CreationDateTime");
            expect(Date.parse(data.TableDescription.CreationDateTime)).to.be.above(now);
            expect(data.TableDescription).to.have.property("ProvisionedThroughput");
            expect(data.TableDescription.ProvisionedThroughput).to.have.property("NumberOfDecreasesToday", 0);
            expect(data.TableDescription.ProvisionedThroughput).to.have.property("ReadCapacityUnits", 1);
            expect(data.TableDescription.ProvisionedThroughput).to.have.property("WriteCapacityUnits", 1);
            expect(data.TableDescription).to.have.property("TableSizeBytes", 0);
            expect(data.TableDescription).to.have.property("ItemCount", 0);
            done();
        });
    });

    it("Populates the Prediction table", function (done) {
        dynamodb.batchWriteItem(tables[0].data, function (err, data) {
            expect(err).to.not.exist;
            expect(data).to.have.property("UnprocessedItems");
            expect(data.UnprocessedItems).to.be.empty;
            done();
        });
    });

    it("Queries predictions from Prediction table by partition key", function(done) {
        var statement = {
            TableName: PREDICTION_TABLE,
            KeyConditionExpression: "EventId = :event_id AND UserId = :user_id",
            ExpressionAttributeValues: {
                ":event_id": {"S": "NFL#2016-02-07T23:25:00+00:00#Levis Stadium#Arizona@Denver"},
                ":user_id": {"S": "facebook|10208601241532203"}
            }
        };

        dynamodb.query(statement, function(err, data) {
            expect(err).to.not.exist;

            done();
        })
    })
});


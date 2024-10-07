"use strict";

const instanceMongodb = require("./src/dbs/init.mongo");
const {
  consumerToQueue,
  consumerToQueueNormal,
  consumerToQueueFailed,
} = require("./src/services/consumerQueue.service");
const sendEmail = require("./src/utils/sendEmail");
const queueName = "test-topic";
consumerToQueueNormal(queueName)
  .then(() => {
    console.log(`Message consumerToQueueNormal started: `);
  })
  .catch((err) => {
    console.error(`Message Error: ${err.message}`);
  });

consumerToQueueFailed(queueName)
  .then(() => {
    console.log(`Message consumerToQueueFailed started: `);
  })
  .catch((err) => {
    console.error(`Message Error: ${err.message}`);
  });
require("./src/dbs/init.mongo");
// sendEmail();

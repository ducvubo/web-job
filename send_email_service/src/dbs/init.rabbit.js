"use strict";

const amqp = require("amqplib");

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:guest@localhost");
    if (!connection) throw new Error("Connection not established");

    const channel = await connection.createChannel();

    return { channel, connection };
  } catch (error) {
    console.error("Error connecting to RabbitMQ", error);
    throw error;
  }
};

const connectToRabbitMQForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();
    //Publish message to a queue
    const queue = "test-queue";
    const message = "Hello, shopDev by Vu Duc Bo";
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));

    //close the connectionS
    await connection.close();
  } catch (error) {
    console.error("Error connecting to RabbitMQ", error);
  }
};

const consumerQueue = async (channel, queueName) => {
  try {
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Waiting for message ...`);
    channel.consume(
      queueName,
      (msg) => {
        console.log(`Received message: ${queueName}::`, msg.content.toString());
      },
      {
        noAcK: true,
      }
    );
  } catch (error) {
    console.error("error publish message to rabbitMQ", error);
    throw error;
  }
};

module.exports = {
  connectToRabbitMQ,
  connectToRabbitMQForTest,
  consumerQueue,
};

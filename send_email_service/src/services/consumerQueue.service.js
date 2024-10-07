"use strict";

const { has } = require("lodash");
const { connectToRabbitMQ, consumerQueue } = require("../dbs/init.rabbit");
const bcrypt = require("bcryptjs");
const { emailOtp } = require("../models/email.model");
const sendEmail = require("../utils/sendEmail");
function generateRandomSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

const messageService = {
  consumerToQueue: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.error("Error consumerToQueue::", error);
    }
  },

  consumerToQueueNormal: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      const notiQueue = "sendEmailQueueProcess";
      channel.consume(notiQueue, async (msg) => {
        try {
          const data = JSON.parse(msg.content.toString());
          console.log(`SEND  successfully processed`, data.data.email);
          const salt = bcrypt.genSaltSync(10);
          const otp = generateRandomSixDigitNumber();
          const hash = bcrypt.hashSync(String(otp), salt);
          await emailOtp.create({ email: data.data.email, hashOtp: hash });
          sendEmail(data.data.email, String(otp));
          channel.ack(msg);
        } catch (error) {
          console.log(error);
          channel.nack(msg, false, false); //nếu có lỗi logic thì đưa vào queue lỗi
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  consumerToQueueFailed: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      const sendEmailExChangeDLX = "sendEmailExDLX";
      const sendEmailRoutingKeyDLX = "sendEmailRoutingKeyDLX";
      const sendEmailQueueHandler = "sendEmailQueueHotFix";
      await channel.assertExchange(sendEmailExChangeDLX, "direct", {
        durable: true,
      });
      channel.prefetch(1);
      const queueResult = await channel.assertQueue(sendEmailQueueHandler, {
        exclusive: false,
      });
      await channel.bindQueue(
        queueResult.queue,
        sendEmailExChangeDLX,
        sendEmailRoutingKeyDLX
      );
      await channel.consume(
        queueResult.queue,
        (msgFailed) => {
          console.log(
            `this notification error, pls hot fix`,
            msgFailed.content.toString()
          );
        },
        {
          noAck: true,
        }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = messageService;

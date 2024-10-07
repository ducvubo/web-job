"use strict";

const { uniqueId } = require("lodash");
const { Schema, model, default: mongoose } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "emailotps";
const COLLECTION_NAME = "emailotps";
const emailOtpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    hashOtp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: "1m" }, // TTL index sẽ xóa bản ghi sau 1 phút
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = {
  emailOtp: model(DOCUMENT_NAME, emailOtpSchema),
};

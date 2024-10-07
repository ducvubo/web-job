"use strict";

const mongoose = require("mongoose");

const connectString = `mongodb+srv://vuducbo:EvIN0kFeI8F22mvl@vuducbo.lhdtx24.mongodb.net/ecommerce`;

const TestSchema = new mongoose.Schema({ name: String });
const Test = mongoose.model("Test", TestSchema);

describe("Mongoose Connection", () => {
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect(connectString);
  });

  //Close the connection to mongoose
  afterAll(async () => {
    await connection.disconnect();
  });

  it("should connect to mongoose", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  it("should save a document to the database", async () => {
    const user = new Test({ name: "Vu Duc Bo" });
    await user.save();
    expect(user.isNew).toBe(false);
  });

  it("should find a document to the database", async () => {
    const user = await Test.findOne({ name: "Vu Duc Bo" });
    expect(user).toBeDefined();
    expect(user.name).toBe("Vu Duc Bo");
  });
});

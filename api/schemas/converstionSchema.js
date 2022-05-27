const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const messageSchema = require("./messageSchema");
const Schema = mongoose.Schema;

const converstionSchema = new Schema({
  messages: [messageSchema],
});

converstionSchema.plugin(timestamp);

const converstionSchemaModel = mongoose.model(
  "conversation",
  converstionSchema
);

module.exports = converstionSchemaModel;

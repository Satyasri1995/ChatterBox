const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  user:{
    type:mongoose.SchemaTypes.ObjectId,
    required:true,
    ref:'user'
  },
  name:{
    type:String,
    required:true
  },
  lastMessage:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'message'
  },
  conversation:{
    type:mongoose.SchemaTypes.ObjectId,
    required:true,
    ref:'conversation'
  }
});

contactSchema.plugin(timestamp);

module.exports = contactSchema;

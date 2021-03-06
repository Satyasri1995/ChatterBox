const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');
const messageSchema = require("./messageSchema");
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
    type:String,
    default:""
  },
  unread:{
    type:mongoose.SchemaTypes.Number,
    default:0
  },
  conversation:{
    type:mongoose.SchemaTypes.ObjectId,
    required:true,
    ref:'conversation'
  }
});

contactSchema.plugin(timestamp);

module.exports = contactSchema;

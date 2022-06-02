const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender:{
    type:mongoose.SchemaTypes.ObjectId,
    required:true,
    ref:"user"
  },
  receiver:{
    type:mongoose.SchemaTypes.ObjectId,
    required:true,
    ref:"user"
  },
  sent:{
    type:mongoose.SchemaTypes.Boolean,
    default:false
  },
  sentDate:{
    type:mongoose.SchemaTypes.Date
  },
  received:{
    type:mongoose.SchemaTypes.Boolean,
    default:false
  },
  receivedDate:{
    type:mongoose.SchemaTypes.Date
  },
  read:{
    type:mongoose.SchemaTypes.Boolean,
    default:false
  },
  readDate:{
    type:mongoose.SchemaTypes.Date
  },
  message:{
    type:String,
    required:true
  }
});

messageSchema.plugin(timestamp);

module.exports = messageSchema;

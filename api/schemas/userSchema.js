const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const contactSchema = require("./../schemas/contactShema");

const userSchema = new Schema({
  mail:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  contacts:[
    contactSchema
  ]
});



userSchema.static('findByMail',function(mail){
  return this.findOne({mail:mail});
})

userSchema.plugin(timestamp);

const userShemaModel = mongoose.model("user", userSchema);

module.exports = userShemaModel;

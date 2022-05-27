const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  mail:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});



userSchema.static('findByMail',function(mail){
  return this.findOne({mail:mail});
})

userSchema.plugin(timestamp);

const userShemaModel = mongoose.model("user", userSchema);

module.exports = userShemaModel;

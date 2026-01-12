const mongoose = require("mongoose");
require("dotenv");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique:true
  },
  image: {
    type: String,
  },
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

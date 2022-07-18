const mongoose = require("mongoose");
const Shema = mongoose.Schema;

// a schema for the users model
const UserShema = new Shema({
  name: String,
});

const User = mongoose.model("user", UserShema);

module.exports = User;

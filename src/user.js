const mongoose = require("mongoose");
const Shema = mongoose.Schema;

// a schema for the users model
const UserShema = new Shema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  postCount: Number,
});

const User = mongoose.model("user", UserShema);

module.exports = User;

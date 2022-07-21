const mongoose = require("mongoose");
const Shema = mongoose.Schema;

// a schema for the users model
const UserShema = new Shema({
  name: {
    type: String,
    required: [true, "Name is required."],
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer than 2 characters.",
    },
  },
  postCount: Number,
});

module.exports = User;

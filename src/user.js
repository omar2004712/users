const mongoose = require("mongoose");
const PostSchema = require("./postSchema");
const Shema = mongoose.Schema;

// a schema for the users model
const UserSchema = new Shema({
  name: {
    type: String,
    required: [true, "Name is required."],
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer than 2 characters.",
    },
  },
  posts: [PostSchema],
  likes: Number,
});

UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

const User = mongoose.model("users", UserSchema);

module.exports = User;

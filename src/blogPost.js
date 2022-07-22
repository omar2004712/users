const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [
    // collect the ids of the post
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

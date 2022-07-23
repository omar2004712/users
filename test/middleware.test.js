const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("middleware", () => {
  let joe, blogPost;
  beforeEach((done) => {
    joe = new User({
      name: "Joe",
    });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep",
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });
});

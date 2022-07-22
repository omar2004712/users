const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");
const Comment = require("../src/comment");

describe("Assocations", () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({
      name: "Joe",
    });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep",
    });
    comment = new Comment({
      content: "Congrats on great post",
    });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("saves a relation between a user and a blogpost", (done) => {
    User.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then((user) => {
        assert.strictEqual(user.blogPosts[0].title, "JS is Great");
        done();
      });
  });
});

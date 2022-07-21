const assert = require("assert");

const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle" }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert.strictEqual(user.posts[0].title, "PostTitle");
        done();
      });
  });

  it("Can add subdocuments to an existing record", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [],
    });

    joe
      .save()
      .then(User.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts.push({ title: "new Title" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert.strictEqual(user.posts[0].title, "new Title");
        done();
      });
  });

  it("deletes a post", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "New Post" }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert.strictEqual(user.posts.length, 0);
        done();
      });
  });
});

const assert = require("assert");
const User = require("../src/user");

describe("Virtual types", () => {
  it("gets the postCount", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "new post" }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert.strictEqual(user.postCount, 1);
        done();
      });
  });
});

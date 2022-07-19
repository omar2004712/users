const assert = require("assert");
const User = require("../src/user");

describe("reading users out of the database", () => {
  let joe; // to make it available in the it test

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("finds all user with the name of joe", (done) => {
    User.find({ name: "Joe" }).then((users) => {
      assert.strictEqual(users[0]._id.toString(), joe._id.toString());
      done();
    });
  });

  it("finds a user with a particular id", (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert.strictEqual(user.name, "Joe");
      done();
    });
  });
});

const assert = require("assert");
const User = require("../src/user");

describe("delete records from the database", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => {
      done();
    });
  });

  it("remove using model instance remove", (done) => {
    joe
      .remove()
      .then(() => User.find({ name: "Joe" }))
      .then((users) => {
        assert.strictEqual(users.length, 0);
        done();
      });
  });

  it("class deleteMany method", (done) => {
    User.deleteMany({ _id: joe._id })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert.strictEqual(user, null);
        done();
      });
  });

  it("class findOneAndRemove method", (done) => {
    User.findOneAndRemove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert.strictEqual(user, null);
        done();
      });
  });
});

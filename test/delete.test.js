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

  function isUserDeleted(operation, done) {
    operation
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert.strictEqual(user, null);
        done();
      });
  }

  it("remove using model instance remove", (done) => {
    isUserDeleted(joe.remove(), done);
  });

  it("class deleteMany method", (done) => {
    isUserDeleted(User.deleteMany({ _id: joe._id }), done);
  });

  it("class findOneAndRemove method", (done) => {
    isUserDeleted(User.findOneAndRemove({ name: "Joe" }), done);
  });

  it("class findByIdAndRemove method", (done) => {
    isUserDeleted(User.findByIdAndRemove(joe._id), done);
  });
});

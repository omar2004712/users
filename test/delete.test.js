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
});

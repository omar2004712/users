const assert = require("assert");
const User = require("../src/user");

describe("Updates records in the database", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });

    joe.save().then(() => done());
  });

  it("instance type using set n save", (done) => {
    joe.set("name", "Alex");
    joe
      .save()
      .then(() => User.find({}))
      .then((users) => {
        assert.strictEqual(users.length, 1); // to check if there is more than one user in the DB
        assert.strictEqual(users[0].name, "Alex"); // to check if the name of the user in the DB is Alex
        done();
      });
  });
});

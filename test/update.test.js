const assert = require("assert");
const User = require("../src/user");

describe("Updates records in the database", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });

    joe.save().then(() => done());
  });

  //to check if the updates of the name worked
  function assertName(operation, done) {
    // operation is a promise returned by any operation done on the DB e.g: updateOne, save
    operation
      .then(() => User.find({})) // to ge all the users inside the DB
      .then((users) => {
        assert.strictEqual(users.length, 1); // to check if there is more than one user in the DB
        assert.strictEqual(users[0].name, "Alex"); // to check if the name of the user in the DB is Alex
        done();
      });
  }

  it("instance type using set n save", (done) => {
    joe.set("name", "Alex");
    assertName(joe.save(), done);
  });

  it("instance updateOne", (done) => {
    assertName(joe.updateOne({ name: "Alex" }), done);
  });
});

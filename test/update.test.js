const assert = require("assert");
const User = require("../src/user");

describe("Updates records in the database", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe", postCount: 1 });

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

  it("class update method", (done) => {
    assertName(User.updateMany({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("class findOneAndUpdate method", (done) => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("class findByIdAndUpdate method", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });

  xit("increment postCount by 1", (done) => {
    // because to make the postCount to be virtual instead of being saved on the DB
    User.updateMany({ name: "Joe" }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert.strictEqual(user.postCount, 2);
        done();
      });
  });
});

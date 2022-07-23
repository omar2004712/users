const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../src/user");

describe("reading users out of the database", () => {
  let joe, alex, maria, zach; // to make it available in the it test

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    alex = new User({ name: "Alex" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });

    Promise.all([joe.save(), zach.save(), alex.save(), maria.save()]).then(
      () => {
        done();
      }
    );
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

  it("skips and limits the result list", (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert.strictEqual(users.length, 2);
        assert.strictEqual(users[0].name, "Joe");
        assert.strictEqual(users[1].name, "Maria");
        done();
      });
  });
});

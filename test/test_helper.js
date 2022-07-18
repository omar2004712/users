const { before } = require("mocha");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise; // to use ES6 promises instead of mongoose promise lib

before((done) => {
  mongoose.connect("mongodb://localhost/users_test"); // build a mongoose DB for testing
  mongoose.connection
    .once("open", () => {
      console.log("good to go!");
      done();
    })
    .on("error", (error) => console.warn("Warning", error));
});

// to avoid piling data in the collection while testing
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // once all the data inside the collection is dropped
    done();
  });
});

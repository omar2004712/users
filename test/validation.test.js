const assert = require("assert");
const User = require("../src/user");

describe("validates records", () => {
  it("reqiures name", () => {
    const joe = new User({ name: undefined });
    const validationResult = joe.validateSync();
    const { message } = validationResult.errors.name;

    assert.strictEqual(message, "Name is required.");
  });
});

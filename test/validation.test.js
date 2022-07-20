const assert = require("assert");
const User = require("../src/user");

describe("validates records", () => {
  it("reqiures name", () => {
    const joe = new User({ name: undefined });
    const validationResult = joe.validateSync();
    const { message } = validationResult.errors.name;

    assert.strictEqual(message, "Name is required.");
  });

  it("requires name to be longer than 2 characters", () => {
    const joe = new User({ name: "Al" });
    const validationResult = joe.validateSync();
    const { message } = validationResult.errors.name;

    assert.strictEqual(message, "Name must be longer than 2 characters");
  });
});

"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-npm-webpack:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({});
  });

  it("creates files", () => {
    assert.file([
      ".gitignore",
      ".npmignore",
      "src/index.ts",
      "package.json",
      "readme.md",
      "tsconfig.json",
      "webpack.config.ts"
    ]);
  });
});

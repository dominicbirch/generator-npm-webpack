"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Scaffolding with ${chalk.bgGreen("generator-npm-webpack")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "What name should be used for the npm package?",
        default: "",
        store: false
      },
      {
        type: "input",
        name: "version",
        message: "What initial version should be used by the package?",
        default: "1.0.0",
        store: false
      },
      {
        type: "input",
        name: "description",
        message: "Description:",
        default: ""
      },
      {
        type: "input",
        name: "author",
        message: "What's your name?",
        default: "",
        store: true
      },
      {
        type: "input",
        name: "author.email",
        message: "What's your email address?",
        default: "",
        store: true
      },
      {
        type: "input",
        name: "author.homepage",
        message: "What's your homepage?",
        default: "",
        store: true
      },
      {
        type: "input",
        name: "homepage",
        message: "What's the URL of the project homepage?",
        default: ""
      },
      {
        type: "input",
        name: "repo",
        message: "What's the repository URL of the project?",
        default: ""
      }
    ];

    // To access props later use this.props.someAnswer;
    this.props = await this.prompt(prompts);
  }

  writing() {
    this.log(yosay("Writing scaffold content..."));

    const ejsFields = {
      ...this.options,
      ...this.props
    };

    this.fs.renderTemplates(
      [
        this.templatePath(".gitignore"),
        this.templatePath(".npmignore"),
        this.templatePath("package.json"),
        this.templatePath("readme.md"),
        this.templatePath("tsconfig.json"),
        this.templatePath("webpack.config.ts")
      ],
      ejsFields
    );

    this.fs.copyTpl(
      this.templatePath("index.ts"),
      this.destinationPath("src/index.ts"),
      ejsFields
    );

    this.npmInstall(["sass-loader@latest"], { "save-dev": true });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};

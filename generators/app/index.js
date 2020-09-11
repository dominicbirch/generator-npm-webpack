"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("update", {
      alias: "u",
      type: Boolean,
      default: false,
      description: "Install the latest versions of all dependencies"
    });
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `よ＿よ。\r\nScaffolding with${chalk.bgGreen(
          " generator-npm-webpack"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "What name should be used for the npm package?",
        default: /[\w .-]+$/i.exec(this.destinationPath())[0],
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

    this.fs.copyTpl(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath(".npmignore"),
      this.destinationPath(".npmignore"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("readme.md"),
      this.destinationPath("readme.md"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.ts"),
      this.destinationPath("webpack.config.ts"),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("index.ts"),
      this.destinationPath("src/index.ts"),
      this.props
    );

    if (this.options.update) {
      yosay("Updating dependencies...");
      this.npmInstall(
        [
          "@types/webpack@latest",
          "bundle-declarations-webpack-plugin@latest",
          "clean-webpack-plugin@latest",
          "ts-loader@latest",
          "ts-node@latest",
          "typescript@latest",
          "webpack@latest",
          "webpack-cli@latest"
        ],
        { "save-dev": true }
      );
    }
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};

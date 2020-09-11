"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { mkdirSync } = require("fs");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("update", {
      alias: "u",
      type: Boolean,
      default: false,
      description: "Install the latest versions of all dependencies"
    });

    this.option("react", {
      type: Boolean,
      default: false,
      description: "The package is a react component library"
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
        message: "Describe the intended purpose of the package:",
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
        name: "author_email",
        message: "What's your email address?",
        default: "",
        store: true
      },
      {
        type: "input",
        name: "author_homepage",
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
      },
      {
        type: "input",
        name: "license",
        message: "Which license should the package use?",
        default: "MIT"
      }
    ];

    // To access props later use this.props.someAnswer;
    this.props = await this.prompt(prompts);
  }

  updatingDependencies() {
    if (this.options.update) {
      yosay("Updating dependencies...");

      this.npmInstall(
        [
          "@types/jest@latest",
          "@types/webpack@latest",
          "bundle-declarations-webpack-plugin@latest",
          "clean-webpack-plugin@latest",
          "jest@latest",
          "ts-jest@latest",
          "ts-loader@latest",
          "ts-node@latest",
          "typescript@latest",
          "webpack@latest",
          "webpack-cli@latest"
        ],
        { "save-dev": true }
      );

      if (this.options.react) {
        this.npmInstall("@types/react@latest", { "save-dev": true });
      }
    }
  }

  writing() {
    this.log(yosay("Writing scaffold content..."));

    this.fs.copyTpl(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("_.npmignore"),
      this.destinationPath(".npmignore"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("jest.config.ts"),
      this.destinationPath("jest.config.ts"),
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
      this.templatePath("src/index.ts"),
      this.destinationPath("src/index.ts"),
      this.props
    );

    if (!this.fs.exists(this.destinationPath("__tests__"))) {
      mkdirSync(this.destinationPath("__tests__"));
    }

    if (this.options.react) {
      this.fs.extendJSON(this.destinationPath("package.json"), {
        devDependencies: {
          "@types/react": "^16.9.46"
        },
        peerDependencies: {
          react: "^16.13.1"
        },
        keywords: ["react"]
      });
    }
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {
    yosay(`${chalk.bold.greenBright(" SCAFFOLDING COMPLETE!")}`);
  }
};

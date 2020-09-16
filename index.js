const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

readmeForm();

async function readmeForm() {
  try {
    await inquirer
      .prompt([
        {
          type: "input",
          message: "What is your GitHub username?",
          name: "username",
          validate: (answer) => {
            if (answer.length < 1) {
              return "Please enter a valid GitHub username.";
            }
            return true;
          },
        },
        {
          type: "input",
          message: "What is the Project Title?",
          name: "title",
          validate: (answer) => {
            if (answer.length < 1) {
              return "A Project Title is required.";
            }
            return true;
          },
        },
        {
          type: "input",
          message: "Provide a short description of the application:",
          name: "description",
        },
        {
          type: "input",
          message: "What is needed to install the application?",
          name: "installation",
        },

        {
          type: "input",
          message: "Input instructions for usage:",
          name: "usage",
        },
        {
          type: "input",
          message: "Contributors:",
          name: "contributing",
        },
        {
          type: "input",
          message: "What commands are required to run tests?",
          name: "tests",
        },
        {
          type: "input",
          name: "email",
          message: "What is your email?",
          validate: (answer) => {
            if (answer.length < 1) {
              return "You must enter your email address.";
            }
            return true;
          },
        },
      ])
      .then(async function (data) {
        const answers = `
 # ${data.title}
 \n![Project license badge](https://img.shields.io/badge/license-MIT-brightgreen)      
  
  ${data.description}

  # Table of Contents
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [License](#License)
  * [Contributing](#Contributing)
  * [Tests](#Tests)
  * [Questions](#Questions)
  
  ## Installation
    ${data.installation}
  ## Usage
  ${data.usage}
  ## Contributing
  ${data.contributing}
  ## Tests
  ${data.tests}
  ## Questions  
 Contact me at:
 ##### Email: ${data.email}
 ##### Github: [https://${data.username}](https://github.com/${data.username})
    `;
        fs.writeFile("README.md", answers, function (err) {
          if (err) {
            throw err;
          }
          console.log(`README.md has been saved.`);
        });
      });
  } catch (err) {
    console.log(err);
  }
}

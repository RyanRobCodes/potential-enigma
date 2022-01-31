// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require('./Develop/utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        question: "What is your Github username?",
        name: 'username',
        def: 'RyanRobCodes'

    },

    {
        type: 'input',
        message: "What is the name of your Github repo?",
        name: 'repo',
        def: 'sample-repo'
    },

    {
        type: 'input',
        message: "What is your project called?",
        name: 'project',
        default: 'sample-project'
    },

    {
        type: 'input',
        message: "Provide the steps required to install your project.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide instructions and examples of your project.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "Provide guidelines on how other developers can add to the project.",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "Provide the tests written for your application and provide examples.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0'],
        name: 'license'
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("ReadMe created")
    });
}
const writeFileAsync = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
    try {
        const userResponses = await inquirer.prompt(questions);
        console.log("Responses:", userResponses);
    
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        await writeFileAsync('sample-readme', markdown);

    } catch (error) {
        console.log(error);
    }
};

// Function call to initialize app
init();
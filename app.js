const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const team = [];

const render = require("./lib/htmlRenderer");

function askManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager name?",
        name: "managerName",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "No blank fields";
        },
      },
      {
        type: "input",
        message: "What is your email?",
        name: "managerEmail",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "No blank fields";
        },
      },
      {
        type: "input",
        message: "What is your manager id?",
        name: "managerId",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "No blank fields";
        },
      },
      {
        type: "input",
        message: "What is your office number",
        name: "managerNumber",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "No blank fields";
        },
      },
    ])
    .then(function (answer) {
      const manager = new Manager(
        answer.managerName,
        answer.managerId,
        answer.managerEmail,
        answer.managerNumber
      );
      team.push(manager);
      createEmployeePrompt()
    });
}
function createEmployeePrompt() {
  inquirer.prompt([
    {
      type: "list",
      name: "employees",
      message: "Would you like to add any more employees?",
      choices: [
        {
          name: "Manager",
          value: "Manager",
        },
        {
          name: "Engineer",
          value: "Engineer",
        },
        {
          name: "Intern",
          value: "Intern",
        },
        {
          name: "None",
          value: "None",
        },
      ],
    },
  ]).then(function(answers){
      switch(answers.employees) {
        case "Manager":
              askManager();
        break;
        case "Engineer":
            askEngineer();
        break;
        case "Intern":
            askIntern();
        break;
        
        default: 
            console.log("building team");
            buildTeam();
  }
  })
}

function askEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your engineer's name?",
          name: "engineerName",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "No blank fields";
          },
        },
        {
          type: "input",
          message: "What is your email?",
          name: "engineerEmail",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "No blank fields";
          },
        },
        {
          type: "input",
          message: "What is your engineer's id?",
          name: "engineerId",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "No blank fields";
          },
        },
        {
          type: "input",
          message: "What is your Github",
          name: "engineerGit",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "No blank fields";
          },
        },
      ])
      .then(function (answer) {
        const engineer = new Engineer(
          answer.engineerName,
          answer.engineerId,
          answer.engineerEmail,
          answer.engineerGit
        );
        team.push(engineer);
        createEmployeePrompt()
      });
  }

  function askIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your intern's name?",
          name: "internName",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "No blank fields";
          },
        },
        {
          type: "input",
          message: "What is your email?",
          name: "internEmail",
          validate: (answer) => {
        const pass = answer.match(/\S+@\S+\.\S+/)
        if(pass) {
            return true;
        }
        return "Please enter a valid email"
          },
        },
        {
          type: "input",
          message: "What is your intern's id?",
          name: "internId",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "No blank fields";
          },
        },
        {
          type: "input",
          message: "What school did you attend?",
          name: "internSchool",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "No blank fields";
          },
        },
      ])
      .then(function (answer) {
        const intern = new Intern (
          answer.internName,
          answer.internId,
          answer.internEmail,
          answer.internSchool
        );
        team.push(intern);
        createEmployeePrompt()
      });
  }

  function buildTeam() {
      if(!fs.existsSync(OUTPUT_DIR)){
          fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(team), "utf-8")
  }
  
askManager();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``

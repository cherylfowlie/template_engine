const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//employee array 
const employees = [];

// New manager setup Manager
function newManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Manager Name: "
        },
        {
            type: 'number',
            name: 'id',
            message: 'Manager ID: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'Manager Email:'
        },
        {
            type: 'number',
            name: 'officeNumber',
            message: 'Manager Office Number: '
        }
    ]).then((response) => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        console.log(manager)
        employees.push(manager);
        newEmployee();
    });
}

//Team Member
function newEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'newEmployee',
            message: "Select New Employee:",
            choices: [
                'Engineer',
                'Intern',
                'No more, quit.'
            ]
        }
    ]).then((response) => {
        switch (response.newEmployee) {
            case 'Engineer': newEngineer();
                break;
            case 'Intern': newIntern();
                break;
            default: employeeSummary();
        }
    });
}

//Engineer
function newEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Engineer Name: '
        },
        {
            type: 'number',
            name: 'id',
            message: "Engineer ID: "
        },
        {
            type: 'input',
            name: 'email',
            message: "Email: "
        },
        {
            type: 'input',
            name: 'github',
            message: 'Github Username: '
        }
    ]).then((response) => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employees.push(engineer);
        newEmployee();
    });

}

//Intern
function newIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Intern Name: '
        },
        {
            type: 'number',
            name: 'id',
            message: 'Intern ID: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'Intern Email: '
        },
        {
            type: 'input',
            name: 'school',
            message: 'School Attended: '
        }
    ]).then((response) => {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(intern);
        newEmployee();
    });
}

//Employee Summary
function employeeSummary() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    else {
        fs.writeFileSync(outputPath, render(employees), "utf-8");
    }
}

newManager();

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
// for the provided `render` function to work! ```

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
//Grabs employee js file as a base
const Employee = require("./Employee");

//Class extends employee with base information 
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        //Extra infor for engineer only
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;
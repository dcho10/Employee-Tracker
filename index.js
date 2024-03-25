const inquirer = require("inquirer");
// ```md
// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
// ```


// NOTES:

// add department should a give a prompt (i.e. "what is the name of the department")

// add role should give a prompt (i.e. "what is the name of the role"), add salary should give a prompt (i.e. what is the salary), what department does role belong to (should give response of "added to database")

// add employee should ask for first name, last name, role, employee's manager


function mainPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
            name: "management",
        }
    ])
}

function viewEmployees() {
    // view all employees should return a table with id, first name, last name, title, department, salary, manager
}

function addEmployees() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter the first name.",
            name: "firstName",
        },
        {
            type: "input",
            message:"Please enter the last name.",
            name: "lastName",
        },
        {
            type: "input",
            message: "What is their role?",
            name: "role",
        },
        {
            type: "input",
            message: "Who is their manager?",
            name: "manager",
        }
    ])
}

function updateRole() {
    // update employee role should let you select the name of the employee and assign them a role and give resp ("updated role")
}

function viewRole() {
    // view all roles should return a table with id, title, department, salary
}

function addRole() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to add?",
            name: "role",
        },
        {
            type: "input",
            message: "What is their salary?",
            name: "salary",
        },
        {
            type: "input",
            message: "What department do they belong to?",
            name: "roleDepartment"
        },
    ])
}

function viewDepartment() {
    // view all departments should generate table with id and name

}

function addDepartment() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to add?",
            name: "addDepartment"
        }
    ])
}
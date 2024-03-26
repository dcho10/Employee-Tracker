const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Thefullbullpen10!",
        database: "employees_db"
    },
    console.log("Connected to employes_db database.")
);

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


function viewEmployees() {

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
            message: "What is their role ID? (1. Sales Lead, 2. Salesperson, 3. Lead Engineer, 4. Software Engineer, 5. Account Manager, 6. Accountant, 7. Legal Team Lead, 8. Lawyer)",
            name: "role",
        },
        {
            type: "input",
            message: "What is their manager's ID? (1. John Doe, 3. Ashley Rodriguez, 5. Kunal Singh, 7. Sarah Lourd)",
            name: "manager",
        }

    ]).then(answers => {
        const { firstName, lastName, role, manager } = answers;
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
            [firstName, lastName, role, manager],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    console.log("Employee added successfully.");
                    resolve(result);
                }
            });
        });
    }).catch(error => {
    console.error("Error adding employee:", error);
    });
}

// function updateRole() {
//     // update employee role should let you select the name of the employee and assign them a role and give resp ("updated role")
// }

function viewRole() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM roles`, function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.table(results);
                resolve(results);
            }
        });
    });
}

function addRole() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to add?",
            name: "title",
        },
        {
            type: "input",
            message: "What is their salary?",
            name: "salary",
        },
        {
            type: "input",
            message: "What department do they belong to? (1. Sales, 2. Engineering, 3. Finance, 4. Legal)",
            name: "departmentId"
        },
    ]).then(answers => {
        const { title, salary, departmentId } = answers;
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
            [title, salary, departmentId],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    console.log("Role added.");
                    resolve(result);
                }
            });
        });
    }).catch(error => {
    console.error("Error adding role:", error);
    });

}

function viewDepartment() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM department`, function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.table(results);
                resolve(results);
            }
        });
    });
}

function addDepartment() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What department would you like to add?",
            name: "addDepartment"
        }
    ]).then(answers => {
        const { addDepartment } = answers;
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO department (department_name) VALUES ?`,
            [addDepartment],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    console.log("Department added");
                    resolve(result);
                }
            });
        });
    }).catch(error => {
    console.error("Error adding department:", error);
    });

}

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

function main() {
    let quit = false;
    mainPrompt()
    .then(({ management }) => {
        switch (management) {
            case "View Employees":
                return viewEmployees().then(main);

            case "Add Employee":
                return addEmployees().then(main);

            // case "Update Employee Role":
            //     return updateRole().then(main);

            case "View Roles":
                return viewRole().then(main);

            case "Add Role":
                return addRole().then(main);

            case "View Department":
                return viewDepartment().then(main);

            case "Add Department":
                return addDepartment().then(main);

            case "Quit":
                console.log("Exiting...");
                quit = true;
                break;
            }
        })
    .then(() => {
        if (quit) {
            return main();
        }
    })
    .catch(err => {
        console.error("Error:", err)
    });
}
main();
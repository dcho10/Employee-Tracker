const inquirer = require("inquirer");
const mysql = require("mysql2");

// Estbalish a connection
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "employees_db"
    },
    console.log("Connected to employes_db database.")
);

// EMPLOYEE FUNCTIONALITY ========================================================================================================================================================

function viewEmployees() {
    // Used new Promise to ensure there is no issue with fetching employees before it generates the table
    return new Promise((resolve, reject) => {
        // Used SELECT * FROM to see all the values from employees table
        db.query('SELECT * FROM employees', (err, rows) => {
            if (err) {
                reject('Error fetching employees: ' + err.stack);
                return;
            }
            console.table(rows);
            resolve();
        });
    });
}

function addEmployees() {
    db.query('SELECT * FROM employees WHERE manager_id IS NULL', (err, employees) => {
        if (err) {
            console.error('Error fetching employees: ' + err.stack);
            return;
        }
        // Create array of employee choices
        const managerChoices = employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));
    db.query('SELECT * FROM roles', (err, roles) => {
        if (err) {
            console.error('Error fetching roles: ' + err.stack);
            return;
        }
        // Create array of role choices
        const roleChoices = roles.map(role => ({
            name: role.title,
            value: role.id
        }));
        // Start inquirer prompt
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
                type: "list",
                message: "What is their role ID?",
                choices: roleChoices,
                name: "role",
            },
            {
                type: "list",
                message: "What is their manager's ID?",
                choices: managerChoices,
                name: "manager",
            }

            ]).then(answers => {
                const { firstName, lastName, role, manager } = answers;
                // Used Promise to ensure all the values of first_name, last_name, role_id, manager_id are inputted with correct values (VARCHAR, INT) and order
                return new Promise((resolve, reject) => {
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                    [firstName, lastName, role, manager],
                    (error, result) => {
                        // If any error occurs, the function will end otherwise it will add the employee
                        if (error) {
                            reject(error);
                        } else {
                            console.log("Employee added successfully.");
                            resolve(result);
                        }
                    });
                });
            })
            .then(main)
            .catch(error => { // Catch function if any issues occur
            console.error("Error adding employee:", error);
            });
        });
    });
};


// ROLE FUNCTIONALITY ==============================================================================================================================================================

function updateRole() {
    // Generate employees table
    db.query('SELECT * FROM employees', (err, employees) => {
        if (err) {
            console.error('Error fetching employees: ' + err.stack);
            return;
        }
        // Create array of employee choices
        const employeeChoices = employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));

        // Generate roles table
        db.query('SELECT * FROM roles', (err, roles) => {
            if (err) {
                console.error('Error fetching roles: ' + err.stack);
                return;
            }
            // Create array of role choices
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
            }));

            // Start inquirer prompt 
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Select the employee to update:',
                    choices: employeeChoices,
                    name: 'employeeId',
                },
                {
                    type: 'list',
                    message: 'Select the new role for the employee:',
                    choices: roleChoices,
                    name: 'roleId',
                }
            ]).then(answers => {
                db.query(
                    // Used UPDATE to update the role of the employee
                    'UPDATE employees SET role_id = ? WHERE id = ?',
                    [answers.roleId, answers.employeeId],
                    (err, result) => {
                        if (err) {
                            console.error('Error updating employee role: ' + err.stack);
                            return;
                        }
                        console.log('Employee role updated successfully!');
                        main();
                    }
                );
            });
        });
    });
}

function viewRole() {
    // Used new Promise to ensure there is no issue with fetching roles before it generates the table
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles', (err, rows) => {
            if (err) {
                reject('Error fetching roles: ' + err.stack);
                return;
            }
            console.table(rows);
            resolve();
        });
    });
}

function addRole() {
    db.query('SELECT * FROM department', (err, department) => {
        if (err) {
            console.error('Error fetching departments: ' + err.stack);
            return;
        }
        // Create array of role choices
        const departmentChoices = department.map(department => ({
            name: department.department_name,
            value: department.id
        }));

    
        // Start inquirer prompt
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
                type: "list",
                message: "What department do they belong to?",
                choices: departmentChoices,
                name: "departmentId"
            },
        ]).then(answers => {
            const { title, salary, departmentId } = answers;
            return new Promise((resolve, reject) => {
                // Used Promise to ensure all the values of title, salary, department_id are inputted with correct values (VARCHAR, DECIMAL, INT) and order
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
                [title, salary, departmentId],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log("Role added!");
                        resolve(result);
                    }
                });
            });
        }).then(main)
        .catch(error => {
        console.error("Error adding role:", error);
        });
    });
}

// DEPARTMENT FUNCTIONALITY ==========================================================================================================================================================

function viewDepartment() {
    // Used new Promise to ensure there is no issue with fetching departments before it generates the table
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', (err, rows) => {
            if (err) {
                reject('Error fetching departments: ' + err.stack);
                return;
            }
            console.table(rows);
            resolve();
        });
    });
}

function addDepartment() {
    // Start inquirer prompt
    return inquirer.prompt([
        {
            type: "input",
            message: "What department would you like to add?",
            name: "addDepartment"
        }
    ]).then(answers => {
        const { addDepartment } = answers;
        // Used Promise to ensure the value of department_name is inputted with correct value (VARCHAR)
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO department (department_name) VALUES (?)`,
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
    }).then(main)
    .catch(error => {
    console.error("Error adding department:", error);
    });

}

// MAIN FUNCTIONALITY ==============================================================================================================================================================

function main() {
    // Start inquirer prompt. provides user with list of options to choose from
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'Add Employee',
                'Update Employee Role',
                'View Roles',
                'Add Role',
                'View Departments',
                'Add Department',
                'Quit'
            ]
        }
    // Then based on the option the use selects, use switch cases to run that specific function, after that function is completed, goes back to main prompt until user wants to quit
    ]).then(answer => {
        switch (answer.action) {
            case 'View Employees':
                viewEmployees().then(main);
                break;
            case 'Add Employee':
                addEmployees()
                break;
            case 'Update Employee Role':
                updateRole()
                break;
            case 'View Roles':
                viewRole().then(main);
                break;
            case 'Add Role':
                addRole()
                break;
            case 'View Departments':
                viewDepartment().then(main);
                break;
            case 'Add Department':
                addDepartment().then(main);
                break;
            case 'Quit':
                console.log("Goodbye!");
                db.end(); 
                break;
        }
    }).catch(err => {
        console.error("Error:", err);
        db.end(); 
    });
}
main();
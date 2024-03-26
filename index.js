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

function viewEmployees() {
    return new Promise((resolve, reject) => {
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

function updateRole() {
    db.query('SELECT * FROM employees', (err, employees) => {
        if (err) {
            console.error('Error fetching employees: ' + err.stack);
            return;
        }
        const employeeChoices = employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));

        db.query('SELECT * FROM roles', (err, roles) => {
            if (err) {
                console.error('Error fetching roles: ' + err.stack);
                return;
            }
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
            }));

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
    return inquirer.prompt([
        {
            type: "input",
            message: "What department would you like to add?",
            name: "addDepartment"
        }
    ]).then(answers => {
        const { addDepartment } = answers;
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
    }).catch(error => {
    console.error("Error adding department:", error);
    });

}

function main() {
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
    ]).then(answer => {
        switch (answer.action) {
            case 'View Employees':
                viewEmployees().then(main);
                break;
            case 'Add Employee':
                addEmployees().then(main);
                break;
            case 'Update Employee Role':
                updateRole()
                break;
            case 'View Roles':
                viewRole().then(main);
                break;
            case 'Add Role':
                addRole().then(main);
                break;
            case 'View Department':
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
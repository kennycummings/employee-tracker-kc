const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employeetracker_db'
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
    startApp();
});

// Function to start the application
function startApp() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
            }
        });
}

// Function to view all departments
function viewDepartments() {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        // Call startApp again to prompt the user for the next action
        startApp();
    });
}

// Function to view all roles
function viewRoles() {
    const query = `
        SELECT 
            r.id AS role_id,
            r.title AS job_title,
            r.salary,
            d.name AS department
        FROM roles r
        INNER JOIN department d ON r.department_id = d.id
    `;

    connection.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        // Call startApp again to prompt the user for the next action
        startApp();
    });
}

// Function to view all employees
function viewEmployees() {
    const query = `
        SELECT 
            e.id AS employee_id,
            e.first_name,
            e.last_name,
            r.title AS job_title,
            d.name AS department,
            r.salary,
            CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employees e
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id
    `;

    connection.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        // Call startApp again to prompt the user for the next action
        startApp();
    });
}

// Function to add a department
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
    })
    .then((answer) => {
        connection.query('INSERT INTO department SET ?', answer, (err, results) => {
            if (err) {
                console.error(err); // Log the error to the console
                throw err; // Throw the error to stop the execution
            }
            console.log('Department added successfully!');
            // Call startApp again to prompt the user for the next action
            startApp();
        });
    });
}

// Function to add a role
function addRole() {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the employee?',
    })
    .then((answer) => {
        connection.query('INSERT INTO role SET ?', answer, (err, results) => {
            if (err) {
                console.error(err); // Log the error to the console
                throw err; // Throw the error to stop the execution
            }
            console.log('Role added successfully!');
            // Call startApp again to prompt the user for the next action
            startApp();
        });
    });
}

// Function to add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?',
        },
    ])
    .then((answer) => {
        connection.query('INSERT INTO employees SET ?', answer, (err, results) => {
            if (err) {
                console.error(err); // Log the error to the console
                throw err; // Throw the error to stop the execution
            }
            console.log('Employee added successfully!');
            // Call startApp again to prompt the user for the next action
            startApp();
        });
    });
}

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
                // Add other choices based on the bonus requirements
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
    connection.query('SELECT * FROM roles', (err, results) => {
        if (err) throw err;
        console.table(results);
        // Call startApp again to prompt the user for the next action
        startApp();
    });
}

// Function to view all employees
function viewEmployees() {
    connection.query('SELECT * FROM employees', (err, results) => {
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

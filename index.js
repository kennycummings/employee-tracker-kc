const inquirer = require('inquirer');
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: '',
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
                // Add other cases for different actions
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

// Add other functions for different actions as needed

// Remember to handle user input, execute SQL queries, and close the connection appropriately

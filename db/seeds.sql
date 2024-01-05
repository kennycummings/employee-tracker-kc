-- Insert department names into department table
INSERT INTO department (name)
VALUES  
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Sales");

-- Insert role fields into role table
INSERT INTO roles (title, salary, department_id)
VALUES  
    ("Sales Lead", 60000, 4),
    ("Salesperson", 50000, 4),
    ("Lead Engineer", 150000, 1),
    ("Software Engineer", 130000, 1),
    ("Account Manager", 90000, 4),
    ("Accountant", 95000, 2),
    ("Legal Team Lead", 155000, 3),
    ("Lawyer", 180000, 3);

-- Insert employee  fields into employee table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  
    ("John", "Smith", 1, NULL),
    ("Chris", "Schuler", 2, 1),
    ("Alex", "Robles", 3, 1),
    ("Armando", "Romo", 4, 3),
    ("Mark", "Cuban", 5, 1),
    ("Theresa", "Cummings", 6, 5),
    ("Mary", "McCann", 6, 3);

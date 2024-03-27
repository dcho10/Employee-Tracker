-- Set up employees_db database
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- Created department table
CREATE TABLE department (
    -- Established id as primary key
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

-- Created roles table
CREATE TABLE roles (
    -- Established id as primary key
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,

    -- Established foreign key
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

--  Created employees table
CREATE TABLE employees (
    -- Established id as primary key
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,

    -- Established foreign key
    role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(id),

    -- Established foreign key
    manager_id INT ,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);



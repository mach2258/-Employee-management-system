DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE roles (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(20) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);
CREATE TABLE employees (
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    roles_id INT,
    manager_id INT,
    FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE SET NULL
)
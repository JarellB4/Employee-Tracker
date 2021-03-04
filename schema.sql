DROP DATABASE IF EXISTS employee_db;
-- Create a database called programming_db --
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

   CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEy, 
  title VARCHAR(30),
  salary DECIMAL ,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  department_id Int
);
  CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  FOREIGN KEY (role_id)REFERENCES role(id),
  role_id INT,
  FOREIGN KEY (manager_id)REFERENCES employee(id),
  manager_id INT
  );


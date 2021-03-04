const mysql = require('mysql');
const inquirer = require('inquirer');
const consoletable = require('console.table');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employee_db',
});

const mainQuestion = () => {

  inquirer.prompt([
    {
      type: 'list',
      name: 'allfunctions',
      message: 'What would you like do?',
      choices: ['add departments', 'add roles, add employees', 'view departments', 'view roles', 'view employees', 'update employee roles']
    }

  ])
    .then(function (Answer) {
      switch (Answer.allfunctions) {
        case 'add department':
          addDepartment()
          break

        case 'add roles':
          addRoles()
          break

        case 'add employees':
          addEmployess()
          break

        case 'view departments':
          viewDepartments()
          break

        case 'view roles':
          viewRoles()
          break

        case 'view employees':
          viewEmployees()
          break

        case 'update employee roles':
          viewEmployeeRoles()
          break


        default:
          break;
      }
    }

    )
  const addDepartment = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'departments',
        message: 'What department would you like to add?',

      }
        .then((answer) => {
          const query = 'SELECT Finance FROM department WHERE ?';
          connection.query(query, {}, (err, res) => {
            if (err) throw err;
            res.forEach(({ department }) => {


            });
          };

        }

}


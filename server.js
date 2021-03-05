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

connection.connect((err) => {
  if (err) throw err;
  mainQuestion();
})

const mainQuestion = () => {

  inquirer.prompt([
    {
      type: 'list',
      name: 'allfunctions',
      message: 'What would you like do?',
      choices: ['add departments', 'add roles', 'add employees', 'view departments', 'view roles', 'view employees', 'update employee roles']
    }

  ])
    .then(function (Answer) {
      switch (Answer.allfunctions) {
        case 'add departments':
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
          updateEmployeeRoles()
          break


        default:
          break;
      }
    }
    )
}


const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departments',
      message: 'What department would you like to add?'

    }
  ])
    .then((answer) => {

      connection.query(
        'INSERT INTO departments SET ?',
        {
          name: answer.departments
        },
        (err) => {
          if (err) throw err;
          console.log("You have successfully added an department")
          mainQuestion()
        })


    })

  const addRoles = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: 'What role would you like to add?'

      }
    ])
      .then((answer) => {

        connection.query(
          'INSERT INTO role SET ?',
          {
            name: answer.role
          },
          (err) => {
            if (err) throw err;
            console.log("You have successfully added a role")
            mainQuestion()
          })








      })
  }

  const addEmployees = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'employee',
        message: 'What employee would you like to add?'

      }
    ])
      .then((answer) => {

        connection.query(
          'INSERT INTO employee SET ?',
          {
            name: answer.employee
          },
          (err) => {
            if (err) throw err;
            console.log("You have successfully added an employee")
            mainQuestion()
          })

          const viewEmployees = (x) => {
            console.log(x)
            connection.query(`SELECT * FROM ${x}`,
              (err, res) => {
                if (err) throw err;
                console.table(res);
                mainQuestion();
              }
            )
          }






      })
  }


  const viewDepartments = (b) => {
    console.log(x)
    connection.query(`SELECT * FROM ${b}`,
      (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
      }
    )
  }



  const viewRoles = (b) => {
    console.log(x)
    connection.query(`SELECT * FROM ${b}`,
      (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
      }
    )
  }

  function updateRole() {
    const updating = "SELECT id, first_name, last_name, role_id  FROM employee";
    connection.query(updating, function (err, res) {
      if (err) throw err;
      console.table(res); // using table to show list of employee's

      let allRoles = 'SELECT * FROM employee_role';
      let roles = connection.query(allRoles, (err, data) => {
        let roleChoices = [];

        for (let i = 0; i < data.length; i++) {
          roleChoices.push({
            name: data[i].title,
            value: data[i].id
          })
        }

        inquirer.prompt([
          {
            type: "input",
            message: "Select the employee by ID that you would like to update",
            name: "employee",

          },

          {

            type: "list",
            message: "Select which role you'd like to update the employee to",
            name: "newRole",
           choices: roleChoices
          }

        ])
          .then((answer) => {
            connection.query(
              'UPDATE employee SET role_id = ? WHERE id = ? ', 

              [
                answer.newRole,
                answer.employee

              ],

              (err) => {
                if (err) throw err;
                console.log("You have successfully udpated a role")
                // ask initial question again.
                mainQuestion();
              }
            );
          });


      })
    });
  };







}
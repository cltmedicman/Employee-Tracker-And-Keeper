const connection = require('../config/connection');
const inquirer = require('inquirer');
const { removeListener } = require('../config/connection');
// const main = require('./main');
const role = require('./role');
const dep = require('./department');


function view() {
    let table = `SELECT e.id, 
    e.first_name AS "First Name", 
    e.last_name AS "Last Name", 
    r.title, 
    d.department_name AS "Department", 
    IFNULL(r.salary, 'No Salary Info') AS "Salary", 
    IFNULL(CONCAT(m.first_name," ",m.last_name), 'No Manager') AS "Manager"
    FROM employee e
    LEFT JOIN roles r 
    ON r.id = e.role_id 
    LEFT JOIN department d 
    ON d.id = r.department_id
    LEFT JOIN employee m ON m.id = e.manager_id
    ORDER BY e.id;`
    
    connection.query(table, function(err, response) {
        if (err) throw err;

        console.table(response);
    });
};

function viewByManager() {
    let managerArr = [];
    let idArr = [];
    let manager = `SELECT *
    FROM employee 
    LEFT JOIN roles ON roles.id = employee.role_id
    WHERE roles.title LIKE '%Lead%';`

    connection.query(manager, function(err, response) {
        if (err) throw err;
        console.log(response);
        for (i = 0; i < response.length; ++i) {
            let res = response[i].first_name + " " + response[i].last_name;
            let id = response[i].id;
            managerArr.push(res);
            idArr.push(id);
        }
        //console.log(managerArr);
        inquirer.prompt([
            {
                name: 'managerList',
                type: 'list',
                message: 'Which manager\'s employees would you like to view?',
                choices: managerArr
            }
        ]).then((answer) => {
            let i = idArr[managerArr.indexOf(answer.managerList)];

            let table = `SELECT *
            FROM employee
            WHERE employee.manager_id=${i};`

            connection.query(table, function(err, response) {
                if (err) throw err;
        
                console.table(response);
            });
        }).then(userInput);
    });
};

function updateMan() {
    // add code later
};

function add() {
    // add code later
};

function updateRole() {
    // add code later
};

function remove() {
    // add code later
};

module.exports = {view, viewByManager, updateMan, add, updateRole, remove};

function userInput() {
    const list = [
        'View all employees',                   // 0
        'View all employees by department',     // 1
        'View all employees by manager',        // 2
        'View all departments',                 // 3
        'View all roles',                       // 4
        'Add department',                       // 5
        'Add role',                             // 6
        'Add employee',                         // 7
        'Update employee role',                 // 8
        'Update employee manager',              // 9
        'Delete employee',                      // 10
        'Delete Role',                          // 11
        'Delete Department',                    // 12
        'View total budget used by department', // 13
        'Quit'                                  // 14
    ];
    inquirer.prompt([
        {
            name: 'mainList',
            type: 'list',
            message: 'What would you like to do?',
            choices: list
        }
    ]).then((answer) => {
        if (answer.mainList.mainList === list[0]) {
            view();
        }

        else if (answer.mainList === list[1]) {
            dep.employee();
        }

        else if (answer.mainList === list[2]) {
            viewByManager();  
        }
    
        else if (answer.mainList === list[3]) {
            dep.view();
        }

        else if (answer.mainList === list[4]) {
            role.view();
        }

        else if (answer.mainList === list[5]) {
            dep.add();
        }
        
        else if (answer.mainList === list[6]) {
            role.add();
        }

        else if (answer.mainList === list[7]) {
            add();
        }

        else if (answer.mainList === list[8]) {
            updateRole();
        }

        else if (answer.mainList === list[9]) {
            updateMan();
        }

        else if (answer.mainList === list[10]) {
            remove();
        }

        else if (answer.mainList === list[11]) {
            role.remove();
        }

        else if (answer.mainList === list[12]) {
            dep.remove();
        }

        else if (answer.mainList === list[13]) {
            dep.budget();
        }

        else if (answer.mainList === list[14]) {
            connection.end();
        }
    })
    
};
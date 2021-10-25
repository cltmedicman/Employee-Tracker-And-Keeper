const connection = require('./app/config/connection');
const inquirer = require('inquirer');
const worker = require('./app/lib/employee');
const dep = require('./app/lib/department');
const role = require('./app/lib/role');

userInput();

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
            worker.view();
        }

        else if (answer.mainList === list[1]) {
            dep.employee();
        }

        else if (answer.mainList === list[2]) {
            worker.viewByManager();
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
            worker.add();
        }

        else if (answer.mainList === list[8]) {
            worker.updateRole();
        }

        else if (answer.mainList === list[9]) {
            worker.updateMan();
        }

        else if (answer.mainList === list[10]) {
            worker.remove();
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

module.exports = {userInput};
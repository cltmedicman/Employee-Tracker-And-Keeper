const connection = require('./app/config/connection');
const cTable = require('console.table');
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
        console.log(answer);
        if (answer = list[0]) {
            console.log('Yes');
            worker.view();
        };

        if (answer = list[1]) {
            dep.employee();
        };

        if (answer = list[2]) {
            worker.viewByManager();
        };
        
        if (answer = list[3]) {
            dep.view();
        };

        if (answer = list[4]) {
            role.view();
        };

        if (answer = list[5]) {
            dep.add();
        };
        
        if (answer = list[6]) {
            role.add();
        };

        if (answer = list[7]) {
            worker.add();
        };

        if (answer = list[8]) {
            worker.updateRole();
        };

        if (answer = list[9]) {
            worker.updateMan();
        };

        if (answer = list[10]) {
            worker.remove();
        };

        if (answer = list[11]) {
            role.remove();
        };

        if (answer = list[12]) {
            dep.remove();
        };

        if (answer = list[13]) {
            dep.budget();
        };

        if (answer = list[14]) {
            connection.end();
        }
    });
};
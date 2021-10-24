const conn = require('./app/config/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');
const emp = require('./app/lib/employee');
const dep = require('./app/lib/department');
const role = require('./app/lib/role');

userInput();

function userInput() {
    /* const list = [
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
    ]; */
    inquirer.prompt([
        {
            name: 'mainList',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                {
                  name: "View All Employees",
                  value: "VIEW_EMPLOYEES"
                },
                {
                  name: "View All Employees By Department",
                  value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                }
            ]
        }
    ]).then((answer) => {
        console.log(answer.choice);
        /* if (answer === list[0]) {
            emp.view();
        };

        if (answer === list[1]) {
            dep.employee();
        };

        if (answer === list[2]) {
            emp.viewByManager();
        };
        
        if (answer === list[3]) {
            dep.view();
        };

        if (answer === list[4]) {
            role.view();
        };

        if (answer === list[5]) {
            dep.add();
        };
        
        if (answer === list[6]) {
            role.add();
        };

        if (answer === list[7]) {
            emp.add();
        };

        if (answer === list[8]) {
            emp.updateRole();
        };

        if (answer === list[9]) {
            emp.updateMan();
        };

        if (answer === list[10]) {
            emp.remove();
        };

        if (answer === list[11]) {
            role.remove();
        };

        if (answer === list[12]) {
            dep.remove();
        };

        if (answer === list[13]) {
            dep.budget();
        };

        if (answer === list[14]) {
            conn.end();
        } */
    });
};
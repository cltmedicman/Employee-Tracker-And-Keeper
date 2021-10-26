const connection = require('./app/config/connection');
const inquirer = require('inquirer');
const emp = require('./app/lib/employee');
const role = require('./app/lib/role');
const dep = require('./app/lib/department');

const userInput= () => {
    console.clear();
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
        if (answer.mainList === list[0]) {
            emp.view();
            userInput();
        }

        else if (answer.mainList === list[1]) {
            dep.viewEmployee();
            setTimeout(() => {
                userInput();
            },5000)
        }

        else if (answer.mainList === list[2]) {
            emp.viewByManager();  
            setTimeout(() => {
                userInput();
            },5000)
        }
    
        else if (answer.mainList === list[3]) {
            dep.view();
            userInput();
        }

        else if (answer.mainList === list[4]) {
            role.view();
            userInput();
        }

        else if (answer.mainList === list[5]) {
            dep.add();
            setTimeout(() => {
                userInput();
            },8000)
        }
        
        else if (answer.mainList === list[6]) {
            role.add();
            setTimeout(() => {
                userInput();
            },15000)
        }

        else if (answer.mainList === list[7]) {
            emp.add();
            setTimeout(() => {
                userInput();
            },15000)
        }

        else if (answer.mainList === list[8]) {
            emp.updateRole();
            setTimeout(() => {
                userInput();
            },8000)
        }

        else if (answer.mainList === list[9]) {
            emp.updateMan();
            setTimeout(() => {
                userInput();
            },8000)
        }

        else if (answer.mainList === list[10]) {
            emp.remove();
            setTimeout(() => {
                userInput();
            },8000)
        }

        else if (answer.mainList === list[11]) {
            role.remove();
            setTimeout(() => {
                userInput();
            },8000)
        }

        else if (answer.mainList === list[12]) {
            dep.remove();
            setTimeout(() => {
                userInput();
            },8000)
        }

        else if (answer.mainList === list[13]) {
            dep.budget();
            setTimeout(() => {
                userInput();
            },8000)
        }

        else if (answer.mainList === list[14]) {
            connection.end();
        }
    })
    
};

userInput();
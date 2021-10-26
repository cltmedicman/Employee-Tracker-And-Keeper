const inquirer = require('inquirer');
const connection = require('../config/connection');

function view() {
    connection.query(`SELECT * FROM department`, function(err,response) {
        if (err) throw err;
        console.log('');
        console.table(response);
    })
};

function viewEmployee() {
    let dep = `SELECT d.department_name AS name
    FROM department d;`

    connection.query(dep, function(err, response) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'dep',
                type: 'list',
                message: 'Select department to view employee\'s from',
                choices: response.map((item) => {
                    return item.name
                })
            }
        ]).then((answer) => {
            let table = `SELECT * FROM employee e
            LEFT JOIN roles r 
            ON r.id = e.role_id 
            LEFT JOIN department d 
            ON d.id = r.department_id
            WHERE d.department_name = '${answer.dep}';`
    
            connection.query(table, function(err, response) {
                    if (err) throw err;
                    console.log('');
                    console.table(response);
                }
            )
        })
    })
}

function add() {
    inquirer.prompt([
        {
            name: 'dep',
            type: 'input',
            message: 'Enter department:'
        }
    ]).then((answer) => {
        connection.query(
            `INSERT INTO department(department_name)
            VALUES ('${answer.dep}')`
        )
    })
};

function remove() {
    let dep = `SELECT d.department_name AS name
    FROM department d;`

    connection.query(dep, function(err, response) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'dep',
                type: 'list',
                message: 'Select department to remove',
                choices: response.map((item) => {
                    return item.name
                })
            }
        ]).then((answer) => {
            connection.query(
                `DELETE FROM department
                WHERE department_name = '${answer.dep}';`
            )
        })
    })
};

function budget() {
    let dep = `SELECT d.department_name AS name
    FROM department d;`
    
    connection.query(dep, function(err, response) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'dep',
                type: 'list',
                message: 'Select department to show budget',
                choices: response.map((item) => {
                    return item.name
                })
            }
        ]).then((answer) => {
            let salary = `SELECT r.salary AS salary
                FROM employee e
                LEFT JOIN roles r 
                ON r.id = e.role_id 
                LEFT JOIN department d 
                ON d.id = r.department_id
                WHERE d.department_name = '${answer.dep}';`
            
            connection.query(salary, function(err, response) {
                if (err) throw err;
                let total = 0;
                response.forEach((item) => {
                    total += item.salary;
                })
                console.log('Total salary for ', answer.dep, ' is: ', total);
            })
        })
    })
};

module.exports = {view, add, remove, budget, viewEmployee};
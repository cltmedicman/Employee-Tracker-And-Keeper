const inquirer = require('inquirer');
const connection = require('../config/connection');

function add() {
    let depA = DepArr();
    let depId = DepArrId();

    setTimeout(() => {
        inquirer.prompt([
            {
                name: 'role',
                type: 'input',
                message: 'Enter role:'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary:'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Choose the department',
                choices: depA    
            }
        ]).then((answer) => {
            let dep_id = depId[depA.indexOf(answer.department)];

            connection.query(
                `INSERT INTO roles(title, salary, department_id)
                VALUES ('${answer.role}', ${answer.salary}, ${dep_id})`
            )
        })
    }, 100)
};

function view() {
    let table = `SELECT r.id AS "ID",
    r.title AS "Title",
    IFNULL(r.salary, 'No Salary Info') AS "Salary",
    d.department_name AS "Department"
    FROM roles r
    LEFT JOIN department d
    ON d.id = r.department_id
    ORDER BY r.id;`

    connection.query(table, function(err, response) {
        if (err) throw err;
        console.log('');
        console.table(response);
    })
};

function remove() {
    let role = `SELECT r.title AS title
    FROM roles r;`

    connection.query(role, function(err, response) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                message: 'Select role to remove',
                choices: response.map((item) => {
                    return item.title
                })
            }
        ]).then((answer) => {
            let role = answer.role;

            connection.query(
                `DELETE FROM roles
                WHERE title = '${role}'`
            )
        })
    })
};

function DepArrId() {
    let arr = [];
    let depId = `SELECT department.id
    FROM department;`

    connection.query(depId, function(err, response) {
        if (err) throw err;
        
        for (i = 0; i < response.length; ++i) {
            let res = response[i].id;
            arr.push(res);
        }
    })
    
    return arr;
}

function DepArr() {
    let arr = [];
    let dep = `SELECT department.department_name
    FROM department;`

    connection.query(dep, function(err, response) {
        if (err) throw err;
        
        for (i = 0; i < response.length; ++i) {
            let res = response[i].department_name;
            arr.push(res);
        }
    })
    
    return arr;

}

module.exports = {add, view, remove};
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
    // fix this
    inquirer.prompt([
        {
            name: 'dep',
            type: 'list',
            message: 'Select department to view employee\'s from',
            choices: response.map((item) => {
                return item.department_name
            })
        }
    ]).then((answer) => {
        let table = `SELECT * FROM employee;`

        connection.query(table, function(err, response) {
                if (err) throw err;
                console.log('');
                console.table(response);
            }
        )
    })
}

function add() {
    // add code later
};

function remove() {
    // add code later
};

function budget() {
    // add code later
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

module.exports = {view, add, remove, budget, viewEmployee};
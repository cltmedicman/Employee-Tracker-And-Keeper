const connection = require('../config/connection');
const inquirer = require('inquirer');
const { removeListener } = require('../config/connection');


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
        });
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
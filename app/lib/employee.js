const connection = require('../config/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

function view() {
    connection.query(`SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    roles.title, 
    department.department_name AS 'department', 
    roles.salary
    FROM employee, roles, department
    WHERE department.id = roles.department_id
    AND roles.id = employee.role_id
    ORDER BY employee.id ASC`,
    (err, response) => {
        if (err) throw err;
        console.table(response);
        console.log(response);
    });
};

function viewByManager() {
    // add code later
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
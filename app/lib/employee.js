const connection = require('../config/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

function view() {
    connection.query(`SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.department_name AS 'department', 
    role.salary
    FROM employee, role, department 
    WHERE department.id = role.department_id 
    AND role.id = employee.role_id
    ORDER BY employee.id ASC`,
    function (err, result, fields) {
        if (err) throw err;
        cTable(result);
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
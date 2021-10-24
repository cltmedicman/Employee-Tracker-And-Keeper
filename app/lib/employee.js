const connection = require('../config/connection');
const inquirer = require('inquirer');

function view() {
    let table = `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
    FROM employee e
    LEFT JOIN roles r 
    ON r.id = e.role_id 
    LEFT JOIN department d 
    ON d.id = r.department_id
    LEFT JOIN employee m ON m.id = e.manager_id
    ORDER BY e.id;`
    //`SELECT emp.id, emp.first_name, emp.last_name, roles.title AS Role, roles.salary AS Salary, department.department_name AS Department, CONCAT(man.first_name, ' ', man.last_name) AS Manager FROM employee emp LEFT JOIN employee man ON emp.manager_id = man.id INNER JOIN roles ON emp.role_id = roles.id INNER JOIN department ON roles.department_id = department.id ORDER BY ID ASC`;
    
    connection.query(table, function(err, response) {
        if (err) throw err;

        console.table(response);
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
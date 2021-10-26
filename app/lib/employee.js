const connection = require('../config/connection');
const inquirer = require('inquirer');
/* const role = require('./role');
const dep = require('./department'); */

function view() {
    let table = `SELECT e.id AS "ID", 
    e.first_name AS "First Name", 
    e.last_name AS "Last Name", 
    r.title AS "Title", 
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
        console.log('');
        console.table(response);
    })
    
};

function viewByManager() {
    let manager = ManagerArr();
    let managerId = ManagerIdArr();
    setTimeout(() => {
        inquirer.prompt([
            {
                name: 'managerList',
                type: 'list',
                message: 'Which manager\'s employees would you like to view?',
                choices: manager
            }
        ]).then((answer) => {
            let id = managerId[manager.indexOf(answer.managerList)];
    
            let table = `SELECT *
            FROM employee
            WHERE employee.manager_id=${id};`
    
            connection.query(table, function(err, response) {
                if (err) throw err;
                console.log('/n');
                console.table(response);
            });
        })
    }, 100);
};

function updateMan() {
    let manager = ManagerArr();
    let managerId = ManagerIdArr();
    
    setTimeout(() => {
        manager.push('No Manager');
        managerId.push('Null');
        let emp = `SELECT
        CONCAT (first_name, " ", last_name) AS name
        FROM employee;`

        connection.query(emp, function(err, response) {
            if (err) throw err;
            
            inquirer.prompt([
                {
                    name: 'emp',
                    type: 'list',
                    message: 'Select an employee to update manager',
                    choices: response.map((item) => {
                        return item.name;
                    })
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Who is the employee\'s manager?',
                    choices: manager
                }
            ]).then((answer) => {
                let id = managerId[manager.indexOf(answer.manager)];
                let nameArr = answer.emp.split(' ');
                let first_name = nameArr[0];
                let last_name = nameArr[1];
                
                connection.query(
                    `UPDATE employee
                    SET manager_id = ${id}
                    WHERE first_name = '${first_name}' 
                    AND last_name = '${last_name}';`
                )
            })
        })
    },100)
};

function add() {
    let manager = ManagerArr();
    let managerId = ManagerIdArr();
    let roles = RoleArr();
    let roleId = RoleArrId();
    
    setTimeout(() => {
        manager.push('No Manager');
        managerId.push('Null');

        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter employee\'s first name:'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter employee\'s last name:'
            },
            {
                name: 'manager',
                type: 'list',
                message: 'Choose employee\'s manager',
                choices: manager
            },
            {
                name: 'role',
                type: 'list',
                message: 'Choose employee\'s role',
                choices: roles
            }
        ]).then((answer) => {
            let manager_id = managerId[manager.indexOf(answer.manager)];
            let role_id = roleId[roles.indexOf(answer.role)];

            connection.query(
                `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES ('${answer.first_name}', '${answer.last_name}', ${role_id}, ${manager_id});`
            )
        })
    },100)
};

function updateRole() {
    let roles = RoleArr();
    let roleId = RoleArrId();

    setTimeout(() => {
        let emp = `SELECT
        CONCAT (first_name, " ", last_name) AS name
        FROM employee;`

        connection.query(emp, function(err, response) {
            if (err) throw err;
            
            inquirer.prompt([
                {
                    name: 'emp',
                    type: 'list',
                    message: 'Select an employee to update role',
                    choices: response.map((item) => {
                        return item.name;
                    })
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'What is the employee\'s role?',
                    choices: roles
                }
            ]).then((answer) => {
                let role_id = roleId[roles.indexOf(answer.role)];
                let nameArr = answer.emp.split(' ');
                let first_name = nameArr[0];
                let last_name = nameArr[1];
                
                connection.query(
                    `UPDATE employee
                    SET role_id = ${role_id}
                    WHERE first_name = '${first_name}' 
                    AND last_name = '${last_name}';`
                )
            })
        })
    },100)
};

function remove() {
    
    let emp = `SELECT
    CONCAT (first_name, " ", last_name) AS name
    FROM employee;`

    connection.query(emp, function(err, response) {
        if (err) throw err;
        
        inquirer.prompt([
            {
                name: 'emp',
                type: 'list',
                message: 'Select an employee to remove',
                choices: response.map((item) => {
                    return item.name;
                })
            }
        ]).then((answer) => {
            let nameArr = answer.emp.split(' ');
            let first_name = nameArr[0];
            let last_name = nameArr[1];
            
            connection.query(
                `DELETE FROM employee
                WHERE first_name = '${first_name}' 
                AND last_name = '${last_name}';`
            )
        })
    })
};

function ManagerArr() {
    let arr=[];
    let manager = `SELECT *
    FROM employee 
    LEFT JOIN roles ON roles.id = employee.role_id
    WHERE roles.title LIKE '%Lead%';`

   connection.query(manager, function(err, response) {
        if (err) throw err;
        
        for (i = 0; i < response.length; ++i) {
            let res = response[i].first_name + " " + response[i].last_name;
            arr.push(res);            
        }
    })

    return arr;
    
}

function ManagerIdArr() {
    let arr = [];
    let manager = `SELECT *
    FROM employee 
    LEFT JOIN roles ON roles.id = employee.role_id
    WHERE roles.title LIKE '%Lead%';`

    connection.query(manager, function(err, response) {
        if (err) throw err;
        
        for (i = 0; i < response.length; ++i) {
            let id = response[i].id;
            arr.push(id);
        }
    })
    
    return arr;
}

function RoleArr() {
    let arr = [];
    let role = `SELECT roles.title
    FROM roles;`

    connection.query(role, function(err, response) {
        if (err) throw err;
        
        for (i = 0; i < response.length; ++i) {
            let res = response[i].title;
            arr.push(res);
        }
    })
    
    return arr;

}

function RoleArrId() {
    let arr = [];
    let roleId = `SELECT roles.id
    FROM roles;`

    connection.query(roleId, function(err, response) {
        if (err) throw err;
        
        for (i = 0; i < response.length; ++i) {
            let res = response[i].id;
            arr.push(res);
        }
    })
    
    return arr;

}

module.exports = {view, viewByManager, updateMan, add, updateRole, remove};
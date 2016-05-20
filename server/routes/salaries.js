var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

// router.post('/', function(req, res) {
//   var employee = req.body;
//
//   pg.connect(connectionString, function(err, client, done) {
//     if (err) {
//       res.sendStatus(500);
//     }
//
//     client.query('INSERT INTO employees ' +
//                 '(first_name, last_name, id_number, job_title, salary, active) ' +
//                 'VALUES ($1, $2, $3, $4, $5, $6)',
//     [employee.firstname, employee.lastname, employee.empID, employee.jobtitle, employee.salary, employee.active],
//                   function(err, result) {
//                     done();
//
//                     if (err) {
//                       res.sendStatus(500);
//                       return;
//                     }
//                     res.sendStatus(201);
//                   }
//     );
//   });
// });

router.get('/', function (req, res) {

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT SUM(salary) AS totalsalary FROM employees;', function(err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);

    });
  });
});



module.exports = router;

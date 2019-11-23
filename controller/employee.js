const employee = require('../db/employee');

exports.createEmployee = (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  employee.createEmployee(fullName, email, password, req, res);
};

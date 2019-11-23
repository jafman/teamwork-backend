const employee = require('../db/employee');

exports.createEmployee = (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  console.log(`FULLNAME: ${JSON.stringify(req.body)}`);

  if (employee.createEmployee(fullName, email, password)) {
    res.status(201).json({
      message: 'Success!'
    });
  }
  res.status(401).json({
    error: 'Could not create user!'
  });
};

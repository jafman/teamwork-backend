const employee = require('../db/employee');

// eslint-disable-next-line no-unused-vars
exports.createEmployee = (req, res, next) => {
  const userFullName = req.body.fullName;
  const userEmail = req.body.email;
  const password = req.body.password;
  employee.createEmployee(userFullName, userEmail, password)
    .then(
      ({ fullName, email }) => {
        res.status(201).json({
          status: 'success',
          data: {
            fullName,
            email
          }
        });
      }
    )
    .catch(
      (error) => {
        console.log(error.stack);
        res.status(500).json({
          status: 'error',
          error: error.detail
        });
      }
    );
};

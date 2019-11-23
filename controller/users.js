const bcrypt = require('bcrypt');
const employee = require('../db/users');


// eslint-disable-next-line no-unused-vars
exports.createUser = (req, res, next) => {
  const userFullName = req.body.fullName;
  const userEmail = req.body.email;
  const password = req.body.password;
  bcrypt.hash(password, 10).then(
    (hash) => {
      employee.createEmployee(userFullName, userEmail, hash)
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
    }
  ).catch(
    (error) => {
      console.log(error.stack);
      res.status(500).json({
        status: 'error',
        error
      });
    }
  );
};

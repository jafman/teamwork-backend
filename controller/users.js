/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const users = require('../db/users');


exports.createUser = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userEmail = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const jobRole = req.body.jobRole;
  const department = req.body.department;
  const address = req.body.address;
  // const { firstName, lastName, password, gender,jobRole, department, address } = req.body;
  bcrypt.hash(password, 10).then(
    (hash) => {
      users.createUser(firstName, lastName, userEmail, hash, gender, jobRole, department, address)
        .then(
          ({ message, token, userId }) => {
            res.status(201).json({
              status: 'success',
              data: { message, token, userId }
            });
          }
        )
        .catch(
          (error) => {
            console.log(error.stack);
            res.status(500).json({
              status: 'error',
              error: error.detail ? error.detail : error
            });
          }
        );
    }
  ).catch(
    (error) => {
      console.log(error.stack);
      res.status(500).json({
        status: 'error',
        error: error.message ? error.message : error
      });
    }
  );
};

exports.signinUser = (req, res, next) => {
  users.signinUser(req.body.email, req.body.password).then(
    ({ token, userId }) => {
      res.status(201).json({
        status: 'success',
        data: { token, userId }
      });
    }
  ).catch(
    (error) => {
      console.log(error.stack);
      res.status(401).json({
        status: 'error',
        error: error.message ? error.message : error
      });
    }
  );
};

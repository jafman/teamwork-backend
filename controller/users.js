/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            // console.log(error);
            const msg2 = error.message ? error.message : error;
            const msg1 = error.detail ? error.detail : error;
            res.status(500).json({
              status: 'error',
              error: msg1 === error ? msg2 : msg1
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
    ({ userId }) => {
      const token = jwt.sign({ userId }, process.env.JWTPUBLICKEY, { expiresIn: '24h' });
      // console.log(`JWT KEY IS: ${process.env.JWTKEY}`);
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

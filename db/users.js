/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const pool = require('./db');


exports.createUser = (firstName, lastName, email, password, gender, jobRole, department, address) => {
  return new Promise((resolve, reject) => {
    pool.connect((error, client, done) => {
      if (error) {
        reject(new Error('Check your connection'));
      } else {
        const queryString = 'INSERT INTO users (firstName, lastName, email, password, gender, jobRole, department, address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id';
        const valueString = [firstName, lastName, email, password, gender, jobRole, department, address];

        client.query(queryString, valueString, (err, res) => {
          done();
          if (err) {
            reject(err);
          } else {
          // console.log(res.rows[0]);
            resolve({
              message: 'User account successfully created',
              token: 'hdfhgdhj7',
              userId: res.rows[0].id
            });
          }
        });
      }
    });
  });
};

exports.signinUser = (email, password) => {
  return new Promise((resolve, reject) => {
    pool.connect((error, client, done) => {
      if (error) throw error;
      const queryString = 'SELECT * FROM users WHERE email=$1';
      const valueString = [email];
      client.query(queryString, valueString, (err, res) => {
        done();
        if (err) {
          reject(err);
        } else if (res.rowCount < 1) {
          reject(new Error('user not found'));
        } else {
          bcrypt.compare(password, res.rows[0].password).then(
            (valid) => {
              if (!valid) {
                reject(new Error('Invalid Password!'));
              } else {
                resolve({
                  token: '128hhju',
                  userId: res.rows[0].id
                });
              }
            }
          ).catch(
            (err1) => {
              reject(err1);
            }
          );
        }
      });
    });
  });
};

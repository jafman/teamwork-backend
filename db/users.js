/* eslint-disable max-len */
const pool = require('./db');


exports.createUser = (firstName, lastName, email, password, gender, jobRole, department, address) => {
  return new Promise((resolve, reject) => {
    pool.connect((error, client, done) => {
      if (error) throw error;
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
    });
  });
};

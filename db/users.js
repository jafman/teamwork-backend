const pool = require('./db');


exports.createEmployee = (fullName, email, password) => {
  return new Promise((resolve, reject) => {
    pool.connect((error, client, done) => {
      if (error) throw error;
      const queryString = 'INSERT INTO employee (full_name, email, password, created_on) VALUES ($1,$2,$3,NOW())';
      const valueString = [fullName, email, password];

      // eslint-disable-next-line no-unused-vars
      client.query(queryString, valueString, (err, res) => {
        done();
        if (err) {
          reject(err);
        } else {
          // console.log(res.rows[0]);
          resolve({ fullName, email });
        }
      });
    });
  });
};

const pool = require('./db');


exports.createEmployee = (fullname, email, password) => {
  pool.connect((error, client, done) => {
    if (error) throw error;
    const queryString = 'INSERT INTO employee (full_name, email, password, created_on) VALUES ($1,$2,$3,NOW())';
    const valueString = [fullname, email, password];

    client.query(queryString, valueString, (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
        // return true;
      }
      // return false;
    });
  });
  console.log('SUCCESS!');
  return true;
};

const pool = require('./db');

module.exports.createEmployee = (fullname, email, password, createdOn) => {
  pool.connect((error, client, done) => {
    if (error) throw error;
    const queryString = 'INSERT INTO employee (fullname, email, password, created_on) VALUES ($1,$2,$3,$4)';
    const valueString = [fullname, email, password, createdOn];
    client.query(queryString, valueString, (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
        return true;
      }
      return false;
    });
  });
};

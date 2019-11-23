const { Pool } = require('pg');

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: process.env.MAX_DB_CONNECTION, // max number of connection can be open to database
  idleTimeoutMillis: process.env.IDLE_TIMEOUT,
  // how long a client is allowed to remain idle before being closed
};

const pool = new Pool(config);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
// eslint-disable-next-line no-unused-vars
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

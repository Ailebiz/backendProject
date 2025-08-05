// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString:'postgresql://ailebiz:0JzYef8G3u4q5pR1iQEp9OzDb4LAUXhh@dpg-d290i7k9c44c73d06b00-a.oregon-postgres.render.com/languages_db_6w96',
  ssl: {rejectUnauthorized:false}
});

module.exports = pool


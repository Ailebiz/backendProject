// db.js
import pkg from 'pg';
const { Pool } = pkg;

export const db = new Pool({
  connectionString:'postgresql://ailebiz:PvAhYlI2ZLnzl2zOKRFu1uFdzqPa4izC@dpg-d28ut73uibrs73e0i8gg-a.oregon-postgres.render.com/languages_db_foqa',
  ssl:{rejectUnauthorized: false}

});



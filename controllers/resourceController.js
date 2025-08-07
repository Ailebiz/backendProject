const pool = require('../config/db');

exports.getResources = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, l.language_name
      FROM endangered_language_resources r
      JOIN endangered_languages l ON r.language_id = l.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Ресурстарды алу қатесі:', err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

const pool = require('../config/db');

exports.getLanguages = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM endangered_languages');
    res.json(result.rows);
  } catch (err) {
    console.error('Тілдерді алу қатесі:', err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT status, COUNT(*) AS count
      FROM endangered_languages
      GROUP BY status
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Статистиканы алу қатесі:', err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

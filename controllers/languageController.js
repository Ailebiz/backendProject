const pool = require('../config/db');

exports.getLanguages = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM endangered_languages ORDER BY id DESC');
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

exports.createLanguage = async (req, res) => {
  const { name, speaker_count, status } = req.body;
  if (!name || !speaker_count || !status) {
    return res.status(400).json({ message: 'Барлық өрістер толтырылуы қажет' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO endangered_languages (name, speaker_count, status) VALUES ($1, $2, $3) RETURNING *',
      [name, speaker_count, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Тілді қосу қатесі:', err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

exports.updateLanguage = async (req, res) => {
  const id = req.params.id;
  const { name, speaker_count, status } = req.body;
  if (!name || !speaker_count || !status) {
    return res.status(400).json({ message: 'Барлық өрістер толтырылуы қажет' });
  }
  try {
    const result = await pool.query(
      'UPDATE endangered_languages SET name=$1, speaker_count=$2, status=$3 WHERE id=$4 RETURNING *',
      [name, speaker_count, status, id]
    );
    if (!result.rows.length) return res.status(404).json({ message: 'Тіл табылмады' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Тілді жаңарту қатесі:', err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

exports.deleteLanguage = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      'DELETE FROM endangered_languages WHERE id=$1 RETURNING *',
      [id]
    );
    if (!result.rows.length) return res.status(404).json({ message: 'Тіл табылмады' });
    res.status(204).send();
  } catch (err) {
    console.error('Тілді жою қатесі:', err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Тіркеу маршруты
router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    await pool.query(
      'INSERT INTO languages (full_name, email, password) VALUES ($1, $2, $3)',
      [fullName, email, password]
    );
    res.json({ message: '✅ Тіркелу сәтті өтті!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
});

// Логин маршруты
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM languages WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Қате email немесе құпиясөз' });
    }

    res.json({ message: '✅ Кіру сәтті өтті!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
});




module.exports = router;

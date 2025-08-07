const bcrypt = require('bcrypt');
const pool = require('../config/db');

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await pool.query(
      'INSERT INTO languages (full_name, email, password) VALUES ($1, $2, $3)',
      [fullName, email, hashedPassword]
    );
    res.json({ message: 'Тіркелу сәтті өтті!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM languages WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Қолданушы табылмады" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Қате email немесе құпиясөз' });
    }

    res.json({ message: '✅ Кіру сәтті өтті!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
};

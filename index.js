require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./config/db')

const app = express();
app.use(cors());
app.use(express.json());

// Жойылып бара жатқан тілдер тізімін алу 
app.get('/api/languages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM endangered_languages');
    res.json(result.rows);
  } catch (err) {
    console.error('Тілдерді алу қатесі:', err);
    res.status(500).json({ message: 'Сервер қатесі' });
  }
});

// Тіркеу 
app.post('/api/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12)

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
});

// Логин 
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM languages WHERE email = $1',
      [email]
    );

   const user = await pool.query("SELECT * FROM languages WHERE email = $1", [email]);

  if (user.rows.length === 0) {
  return res.status(400).json({ message: "User not found" });
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
});

app.listen(3000, () => {
  console.log("✅ Сервер http://localhost:3000 портында жұмыс істеп тұр");
});

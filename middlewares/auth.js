const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 
const router = express.Router();

app.use(express.json());


router.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ fullName, email, password: hashedPassword });
    res.json({ message: 'Тіркелу сәтті өтті' });
  } catch (err) {
    res.status(400).json({ message: 'Email тіркелген' });
  }
});


router.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Қате email немесе құпия сөз' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Қате email немесе құпия сөз' });

    res.json({ message: 'Кіру сәтті', user });
  } catch {
    res.status(500).json({ message: 'Сервер қатесі' });
  }
});

module.exports = router;

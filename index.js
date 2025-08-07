require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const languageRoutes = require('./routes/languageRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', languageRoutes);

app.listen(3000, () => {
  console.log("✅ Сервер http://localhost:3000 портында жұмыс істеп тұр");
});

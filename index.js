require('dotenv').config();
const express = require('express');
const cors = require('cors');
const languageRoutes = require('./routes/languageRoutes');

const app = express();
app.use(express.static('publice'));
app.use(cors());
app.use(express.json());

app.use('/api', languageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Сервер http://localhost:${PORT} портында жұмыс істеп тұр`);
});

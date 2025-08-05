const express = require('express');
const router = express.Router();

// Мысал тілдер деректері
const endangeredLanguages = [
  {
    id: 1,
    name: "Айну",
    native: "Аіпи",
    description: "Айну тілі - Жапонияның түпкі тұрғындарының тілі. Қазір тек бірнеше адам ғана сөйлейді.",
    country: "Жапония",
    speakers: "10-нан аз сөйлеуші",
    year: "1980-жылдар",
    status: "Зерттелуде",
    image: "", // сурет сілтемесі болмаса бос қалдырамыз
    research: true,
    facts: [
      "Жапон тілімен туыстығы жоқ",
      "Ауызша дәстүрлері бай",
      "Жапон үкіметі қолдайды"
    ]
  },
  {
    id: 2,
    name: "Ливон",
    native: "Livô kêj",
    description: "Ливон тілі - Балтық теңізі жағалауындағы фин-угор тілдерінің бірі.",
    country: "Латвия",
    speakers: "30-дан аз",
    year: "2013",
    status: "Зерттелуде",
    image: "",
    research: true,
    facts: [
      "Эстон тіліне ұқсас",
      "Бай халық мәдениеті",
      "Бұрын жеке мемлекет болған"
    ]
  }
];

// Барлық тілдерді алу
router.get('/api/languages', (req, res) => {
  res.json(endangeredLanguages);
});

// Бір тілді ID арқылы алу
app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const language = endangeredLanguages.find(lang => lang.id === id);
  if (!language) return res.status(404).json({ message: "Тіл табылмады" });
  res.json(language);
});

module.exports = router;

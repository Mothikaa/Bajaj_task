// server.js
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// ENV variables
const FULL_NAME = process.env.FULL_NAME || 'john_doe';
const DOB = process.env.DOB || '17091999';
const EMAIL = process.env.EMAIL || 'john@xyz.com';
const ROLL_NUMBER = process.env.ROLL_NUMBER || 'ABCD123';

function makeUserId(fullName, dob) {
  return String(fullName).toLowerCase().trim().replace(/\s+/g, '_') + '_' + dob;
}

app.post('/bfhl', (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        message: '"data" must be an array'
      });
    }

    const data = req.body.data;
    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    const lettersSequence = [];

    for (const item of data) {
      const token = String(item);

      // collect letters for concat logic
      const letters = token.match(/[A-Za-z]/g);
      if (letters) lettersSequence.push(...letters);

      if (/^[+-]?\d+$/.test(token)) {
        const n = parseInt(token, 10);
        sum += n;
        if (Math.abs(n) % 2 === 0) even_numbers.push(token);
        else odd_numbers.push(token);
      } else if (/^[A-Za-z]+$/.test(token)) {
        alphabets.push(token.toUpperCase());
      } else {
        special_characters.push(token);
      }
    }

    const concat_string = lettersSequence
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join('');

    return res.status(200).json({
      is_success: true,
      user_id: makeUserId(FULL_NAME, DOB),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ is_success: false, message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`bfhl API running on port ${PORT}`));

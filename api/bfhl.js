export default function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ is_success: false, error: 'Method Not Allowed' });
    }

    const body = req.body || {};
    const data = Array.isArray(body.data) ? body.data : null;
    if (!data) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid payload. Expected { data: [...] }"
      });
    }

    const FULL_NAME = process.env.FULL_NAME || "your full name";
    const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "ddmmyyyy";
    const EMAIL_ID = process.env.EMAIL_ID || "your_email@vitstudent.ac.in";
    const ROLL_NUMBER = process.env.ROLL_NUMBER || "ABCD123";

    const user_id =
      `${(FULL_NAME || '').toLowerCase().replace(/\s+/g, '_')}_${DOB_DDMMYYYY}`;

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    for (let item of data) {
      const s = (item !== null && item !== undefined) ? String(item) : "";
      if (/^\d+$/.test(s)) {
        const n = parseInt(s, 10);
        sum += n;
        if (n % 2 === 0) even_numbers.push(s);
        else odd_numbers.push(s);
      } else if (/^[a-zA-Z]+$/.test(s)) {
        alphabets.push(s.toUpperCase());
      } else {
        special_characters.push(s);
      }
    }

    const lettersJoined = alphabets.join("");
    const reversed = lettersJoined.split("").reverse();
    const concat_string = reversed
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id,
      email: EMAIL_ID,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, error: err?.message || 'Server Error' });
  }
}

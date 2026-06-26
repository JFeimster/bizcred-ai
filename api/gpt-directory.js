const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'gpts', 'custom-gpts.normalized.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading custom GPTs data:', err);
      return res.status(200).json([]);
    }

    try {
      const gpts = JSON.parse(data);
      res.status(200).json(gpts);
    } catch (parseErr) {
      console.error('Error parsing custom GPTs JSON:', parseErr);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'tools', 'funding-tools.normalized.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading funding tools data:', err);
      return res.status(200).json([]);
    }

    try {
      const tools = JSON.parse(data);
      res.status(200).json(tools);
    } catch (parseErr) {
      console.error('Error parsing funding tools JSON:', parseErr);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

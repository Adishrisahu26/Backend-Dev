//PROBLEM 5
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/process-file', (req, res) => {
  fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) {
      return res.send("input.txt file not found");
    }

    const totalLines = data.split('\n').filter(line => line.trim() !== '').length;
    const totalWords = data.split(/\s+/).filter(word => word !== '').length;

    const result = `Total Lines: ${totalLines}\nTotal Words: ${totalWords}`;

    fs.writeFile('output.txt', result, (err) => {
      if (err) return res.send("Error writing file");

      res.send(" File processed & output.txt created");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
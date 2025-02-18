const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

// Serve static files from the 'client/dist' directory
app.use(express.static('client/dist'));

// Handle all routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile('client/dist/index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
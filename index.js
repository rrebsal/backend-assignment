const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.get('/', (req, res) => {
  const values = {
    title: 'Aappi',
    message: 'Welcome to my API',
    endpoints: [
      { method: 'GET', path: '/api/media', description: 'List all' }
    ]
  };
  res.render('home', values);
});

app.listen(PORT, () => {
  console.log(`Running server on http://localhost:${PORT}`);
});
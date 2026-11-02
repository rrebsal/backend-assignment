const express = require('express');
const path = require('path');
const mediaRouter = require('./routes/media');
const userRouter = require('./routes/user');
const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use('/media', express.static(path.join(__dirname, 'media')));

app.get('/', (req, res) => {
  const values = {
    title: 'Aappi',
    message: 'Welcome to my API',
    endpoints: [
      { method: 'GET', path: '/api/media', description: 'List all media items' },
      { method: 'GET', path: '/api/media/:id', description: 'Get one media item' },
      { method: 'POST', path: '/api/media', description: 'Add a media item' },
      { method: 'PUT', path: '/api/media/:id', description: 'Modify a media item' },
      { method: 'DELETE', path: '/api/media/:id', description: 'Delete a media item' },
      { method: 'GET', path: '/api/user', description: 'List all users' },
      { method: 'GET', path: '/api/user/:id', description: 'Get one user' },
      { method: 'POST', path: '/api/user', description: 'Add a user' },
      { method: 'PUT', path: '/api/user/:id', description: 'Modify a user' },
      { method: 'DELETE', path: '/api/user/:id', description: 'Delete a user' }
    ]
  };
  res.render('home', values);
});

app.use('/api/media', mediaRouter);
app.use('/api/user', userRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
 });

app.listen(PORT, () => {
  console.log(`Running server on http://localhost:${PORT}`);
});
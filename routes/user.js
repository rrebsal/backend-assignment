const express = require('express');
const { users } = require('../data/mock');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.user_id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

router.post('/', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({
      message: 'username, password and email are required'
    });
  }
  const newId = users.length
    ? Math.max(...users.map(u => u.user_id)) + 1
    : 1;
  const newUser = {
    user_id: newId,
    username,
    password: '********',
    email,
    user_level_id: req.body.user_level_id || 2,
    created_at: new Date().toISOString()
  };
  users.push(newUser);
  res.status(201).json({ message: 'User added', user: newUser });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.user_id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { username, email } = req.body;
  if (username === undefined && email === undefined) {
    return res.status(400).json({ message: 'username or email is required' });
  }
  if (username !== undefined) user.username = username;
  if (email !== undefined) user.email = email;
  res.json({ message: 'User updated', user });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.user_id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

module.exports = router;
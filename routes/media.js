const express = require('express');
const { mediaItems } = require('../data/mock');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(mediaItems);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = mediaItems.find(m => m.media_id === id);
  if (!item) {
    return res.status(404).json({ message: 'Media item not found' });
  }
  res.json(item);
});

router.post('/', (req, res) => {
  const { filename, title, description, user_id, media_type } = req.body;
  if (!filename || !title || !user_id || !media_type) {
    return res.status(400).json({
      message: 'filename, title, user_id and media_type are required'
    });
  }
  const newId = mediaItems.length
    ? Math.max(...mediaItems.map(m => m.media_id)) + 1
    : 1;
  const newItem = {
    media_id: newId,
    filename,
    filesize: req.body.filesize || 0,
    title,
    description: description || '',
    user_id,
    media_type,
    created_at: new Date().toISOString()
  };
  mediaItems.push(newItem);
  res.status(201).json({ message: 'Media item added', item: newItem });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = mediaItems.find(m => m.media_id === id);
  if (!item) {
    return res.status(404).json({ message: 'Media item not found' });
  }
  const { title, description } = req.body;
  if (title === undefined && description === undefined) {
    return res.status(400).json({ message: 'title or description is required' });
  }
  if (title !== undefined) item.title = title;
  if (description !== undefined) item.description = description;
  res.json({ message: 'Media item updated', item });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = mediaItems.findIndex(m => m.media_id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Media item not found' });
  }
  mediaItems.splice(index, 1);
  res.json({ message: 'Media item deleted' });
});

module.exports = router;
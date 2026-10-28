console.log('PBLehh...')

const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

const items = [
    { id: 1, name: 'one'},
    { id: 2, name: 'two'},
    { id: 3, name: 'three'}
];

app.get('/items', (req, res) => {
    res.json(items);
   });

app.get('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
   res.json(item);
});

app.post('/items', (req, res) => {
    const newItem =  {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
})

app.put('/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = items.find(f => f.id === id);

    if (!item) {
        return res.status(404).json({ error: 'Item not found'})
    }

    if (!req.body.name) {
        return res.status(400).json({ error: 'Name is required'})
    }

    item.name = req.body.name;
    res.json(item);
});

app.listen(PORT, () => {
    console.log(`Running server on http://localhost:${PORT}`);
   });
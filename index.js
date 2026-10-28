const http = require('http');
const PORT = 3000;

const items = [
  { id: 1, name: 'one' },
  { id: 2, name: 'two' },
  { id: 3, name: 'three' }
];
let nextId = 4;

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function readBody(req, callback) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    try {
      callback(null, JSON.parse(body));
    } catch (err) {
      callback(err);
    }
  });
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const parts = url.split('/'); // '/items/2' -> ['', 'items', '2']
  const isCollection = parts[1] === 'items' && parts.length === 2;
  const isSingle = parts[1] === 'items' && parts.length === 3 && parts[2] !== '';
  const id = Number(parts[2]);

  if (req.method === 'GET' && isCollection) {
    return sendJson(res, 200, items);
  }

  if (req.method === 'GET' && isSingle) {
    const item = items.find(i => i.id === id);
    if (!item) return sendJson(res, 404, { error: 'Item not found' });
    return sendJson(res, 200, item);
  }

  if (req.method === 'POST' && isCollection) {
    return readBody(req, (err, data) => {
      if (err || !data.name) {
        return sendJson(res, 400, { error: 'Name is required' });
      }
      const newItem = { id: nextId++, name: data.name };
      items.push(newItem);
      sendJson(res, 201, newItem);
    });
  }

  if (req.method === 'PUT' && isSingle) {
    return readBody(req, (err, data) => {
      const item = items.find(i => i.id === id);
      if (!item) return sendJson(res, 404, { error: 'Item not found' });
      if (err || !data.name) {
        return sendJson(res, 400, { error: 'Name is required' });
      }
      item.name = data.name;
      sendJson(res, 200, item);
    });
  }

  sendJson(res, 404, { error: 'Resource not found' });
});

server.listen(PORT, () => {
  console.log(`Running server on http://localhost:${PORT}`);
});
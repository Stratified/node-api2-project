const express = require('express');

const server = express();
const port = 5555;


server.use(express.json());

server.post('/api/posts', (req, res) => {
  res.json()
})
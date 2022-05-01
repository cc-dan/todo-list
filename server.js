const express = require('express');
const server = express();

const path = require('path');

server.use(express.json());
server.use(express.static(path.join(__dirname)));

server.listen(3000, function() { console.log("Server ON") });

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

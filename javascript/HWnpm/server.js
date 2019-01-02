const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    setTimeout(function() {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log('got request');
        res.end('Hello World\n');
    }, 100);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});
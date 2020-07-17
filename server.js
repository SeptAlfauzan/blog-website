const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const server = http.createServer((req, res) => {
    // greet()
    // set header
    res.setHeader('Content-Type', 'text/html');
    // set view path as url path
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        case '/about-us':
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            break;
    }
    
    // read html file
    fs.readFile(path, (err, data) => {
        err? console.log(err) : res.write(data);
        res.end();
    })
});

server.listen(3000, 'localhost', () =>{
    console.log('http://localhost:3000/');
});

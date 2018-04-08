import http from 'http';
import option from './option';

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  let aux = new option();

  res.end('Hello World ' + aux.abc() );
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
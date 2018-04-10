import http from 'http';
import option from './option';

import * as firebase from './firebase.config';

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  firebase.default.collection('users').get()
    .then((snapshot) => {
        let str ='';
        snapshot.forEach((doc) => {
            str += doc.id, '=>', doc.data(); 
        });
        res.end(str);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
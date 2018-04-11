import http from 'http';
import option from './option';

import * as firebase from './firebase.config';

async function op(req,res)
{
  
  try{
    let data = await firebase.default.collection('users').get();
    //console.log(data);
    let str ='';
    data.forEach((doc) => {
        str += doc.id, '=>', doc.data(); 
    });

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(str);

  }catch(err){
    console.log('Error getting documents', err);
  }
}

http.createServer(op).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');


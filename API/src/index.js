import express from 'express';
import bodyParser from 'body-parser';
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
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end('wrong header');
  }
}

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;        // set our port

let router =  express.Router();

//middleware
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});

//app.get('/', op);

app.use('/api', router);

app.listen(port, () => { 
  console.log('Server running at http://127.0.0.1:'+port);
});

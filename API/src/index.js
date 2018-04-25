import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';
import helmet from 'helmet';
import compression from 'compression';

import userapi from './endpoints/user'; 
import eventapi from './endpoints/event';

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(methodOverride());
app.use(helmet());
app.use(compression())

let port = process.env.PORT || 8080;
let version = '/v1'

let event_api = new eventapi(express.Router());
app.use(version + event_api.urlbase, event_api.router);

let user_api = new userapi( express.Router() );
app.use(version + user_api.urlbase, user_api.router);


app.listen(port, () => { 
  console.log('Server running at http://127.0.0.1:'+port);
});

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import methodOverride from 'method-override'
import helmet from 'helmet'
import compression from 'compression'
import cluster from 'cluster'
import os from 'os'

import {logsys as logger } from 'apis-core'
import {shutdown} from 'apis-core'

import userapi from './user'
import {userLogic} from 'apis-business-users'
import {userData} from 'apis-business-users' 

const isProduction = process.env.NODE_ENV === 'production'

/*if( cluster.isMaster ) {
  const numCpus = os.cpus().length
  logger.app.info(`Master process is running, PID: ${process.pid}`)
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    logger.app.info(`Process ${worker.process.pid} died`);
  });
  cluster.on('disconnect', (worker) => {
    console.error('disconnect! ${worker.process.pid}');
    cluster.fork();
  });

}else{
*/
  const app = express()
  //app.use(bodyParser.urlencoded({ extended: true }))
  //app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json({ type: 'application/json' }))
  app.use(bodyParser.text({ type: 'text/html' }))
  if(isProduction){
    app.use(morgan('combined', {stream: { write: (str) =>{ logger.app.error(str) }}} ))
  }else{
    app.use(morgan('dev'))
  }
  app.use(methodOverride())
  app.use(helmet())
  app.use(compression())
  app.use(logger.log.connectLogger(logger.http, { level: 'auto' }))
  app.use( (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin')
    next()
  })

  const port = 8081
  const version = '/v1'
  const router = express.Router()
  
  const user_api = new userapi( router , 
                              new userLogic( new userData() ) )
  
  app.use(version + user_api.urlbase, user_api.router)

  const server = app.listen(port, () => { 
    const aux = `PID: ${process.pid} - Server user api running at http://127.0.0.1:${port}`;
    logger.app.info(aux)
  })

  const closeServer = () => {
    logger.app.info('Server user api has been stopped')
  }

  process.on ('SIGTERM', shutdown.gracefulShutdown(server,closeServer));
  process.on ('SIGINT',  shutdown.gracefulShutdown(server,closeServer)); 

//}
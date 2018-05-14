import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import methodOverride from 'method-override'
import helmet from 'helmet'
import compression from 'compression'
import cluster from 'cluster'
import os from 'os'

import logger from './crosscutting/logsys'
import shutdown from './crosscutting/shutdown'

import userApi from './endpoints/user'
import userLogic from './business/user'
import userData from './data/user' 

if( cluster.isMaster ) {
  const numCpus = os.cpus().length
  logger.app.info(`Master process is running, PID: ${process.pid}`)
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    logger.app.info(`Master process ${worker.process.pid} died`);
  });

}else{
  
  let app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(morgan('dev'))
  app.use(methodOverride())
  app.use(helmet())
  app.use(compression())
  app.use(logger.log4js.connectLogger(logger.http, { level: 'auto' }))
  app.use( (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin')
    next()
  })

  let port = 8081
  let version = '/v1'

  let user_api = new userApi( express.Router(), 
                              new userLogic( new userData() ) )
  app.use(version + user_api.urlbase, user_api.router)

  let server = app.listen(port, () => { 
    logger.app.info(`Server user api running at http://127.0.0.1:${port}`)
  })

  const closeServer = () => {
    logger.app.info('Server user api has been stopped')
  }

  process.on ('SIGTERM', shutdown.gracefulShutdown(server,closeServer));
  process.on ('SIGINT',  shutdown.gracefulShutdown(server,closeServer)); 

}
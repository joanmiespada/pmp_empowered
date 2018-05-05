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

import loginapi from './endpoints/login'
import loginData from './data/login'
import loginLogic from './business/login' 

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

  let port = 8080
  let version = '/v1'

  let login_api = new loginapi( express.Router(),
                                new loginLogic( new loginData()))
  app.use(version + login_api.urlbase, login_api.router)

  let server = app.listen(port, () => { 
    logger.app.info(`Worker ${process.pid} server login api running at http://127.0.0.1:${port}`)
  })

  const closeServer = () => {
    logger.app.info(`Worker ${process.pid} login api has been stopped`)
  }

  process.on ('SIGTERM', shutdown.gracefulShutdown(server,closeServer));
  process.on ('SIGINT',  shutdown.gracefulShutdown(server,closeServer)); 

}
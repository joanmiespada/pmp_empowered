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

import loginapi from './login'
import {loginData} from 'apis-business-login'
import {loginLogic} from 'apis-business-login' 

if( cluster.isMaster ) {
  const numCpus = os.cpus().length
  logger.app.info(`Master process is running, PID: ${process.pid}`)
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
}else{

  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json({ type: 'application/json' }))
  app.use(bodyParser.text({ type: 'text/html' }))
  app.use(morgan('dev'))
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

  const port = 8080
  const version = '/v1'

  const login_api = new loginapi( express.Router(),
                                new loginLogic( new loginData()))
  app.use(version + login_api.urlbase, login_api.router)

  const server = app.listen(port, () => { 
    logger.app.info(`PID: ${process.pid} - Server login api running at http://127.0.0.1:${port}`)
  })

  const closeServer = () => {
    logger.app.info(`PID: ${process.pid} - Server login api has been stopped`)
  }
  process.on ('SIGTERM', shutdown.gracefulShutdown(server,closeServer));
  process.on ('SIGINT',  shutdown.gracefulShutdown(server,closeServer)); 

}
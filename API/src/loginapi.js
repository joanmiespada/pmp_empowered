import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import methodOverride from 'method-override'
import helmet from 'helmet'
import compression from 'compression'

import logger from './crosscutting/logsys'
import shutdown from './crosscutting/shutdown'

import loginapi from './endpoints/login'
import loginData from './data/login'
import loginLogic from './business/login' 

let app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.text({ type: 'text/html' }))
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

let port = 8080
let version = '/v1'

let login_api = new loginapi( express.Router(),
                              new loginLogic( new loginData()))
app.use(version + login_api.urlbase, login_api.router)

let server = app.listen(port, () => { 
  logger.app.info(`Server login api running at http://127.0.0.1:${port}`)
})

const closeServer = () => {
  logger.app.info('Server login api has been stopped')
}

process.on ('SIGTERM', shutdown.gracefulShutdown(server,closeServer));
process.on ('SIGINT',  shutdown.gracefulShutdown(server,closeServer)); 

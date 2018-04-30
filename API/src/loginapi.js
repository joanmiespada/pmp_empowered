import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import methodOverride from 'method-override'
import helmet from 'helmet'
import compression from 'compression'
import loginapi from './endpoints/login'
import logger from './crosscutting/logsys'
import shutdown from './crosscutting/shutdown'

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

let login_api = new loginapi( express.Router())
app.use(version + login_api.urlbase, login_api.router)

let server = app.listen(port, () => { 
  logger.app.info(`Server login api running at http://127.0.0.1:${port}`)
})

const closeServer = () => {
  logger.app.info('Server login api has been stopped')
}

process.on ('SIGTERM', shutdown.gracefulShutdown(server,closeServer));
process.on ('SIGINT',  shutdown.gracefulShutdown(server,closeServer)); 

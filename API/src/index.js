import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import methodOverride from 'method-override'
import helmet from 'helmet'
import compression from 'compression'

import userapi from './endpoints/user' 
import loginapi from './endpoints/login'

let app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(methodOverride())
app.use(helmet())
app.use(compression())

let port = process.env.PORT || 8080
let version = '/v1'

let user_api = new userapi( express.Router() )
app.use(version + user_api.urlbase, user_api.router)

let login_api = new loginapi( express.Router() )
app.use(version + login_api.urlbase, login_api.router)


app.listen(port, () => { 
  console.log('Server running at http://127.0.0.1:'+port)
})

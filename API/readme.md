
### API

Here you'll be able to explore a complete API build with NODE.JS from scratch. 

The technical stack is: 

| Element       | Description                     | 
| --------------|:-------------------------------:| 
| Node          | Node runtime to execute the API |
| Babel         | Javascript last features        |   
| Webpack       | Build and bundle js files       | 
| Jest          | Unit testing                    |
| Firebase      | Database NoSQL                  |
| Express       | API Routing                     |
| Travis CI     | Travis configuration            |
| Eslint        | Linting for code style quality  |
| log4js        | Loggin errors and app's messages|
| JWT           | Json Web Tokens to protect you API |

To execute it:
```
yarn install
``` 
If you are running with Node 10, please, use `yarn --ignore-engines`

Once all modules are in node_modules folder you should run every API in unique terminal.
Firt of all, starting with `loginapi`with command: `yarn nodemon-loginapi`.
If you want execute CRUD operations to create users then run `yarn nodemon-userapi`. 

Production: [![Build Status](https://travis-ci.org/joanmiespada/pmp_empowered.svg?branch=production)](https://travis-ci.org/joanmiespada/pmp_empowered)



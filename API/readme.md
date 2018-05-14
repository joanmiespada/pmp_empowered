
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
| Docker        | Api Dockerized                     |
| Lerna         | Local packages dependencies        |

To install dependencies:
```
yarn install
``` 
If you are running with Node 10, please, use `yarn --ignore-engines`

Once all modules are in node_modules folder you should run every API in unique terminal.
Firt of all, starting with `loginapi`with command: `yarn nodemon-loginapi`.
If you want execute CRUD operations to create users then run `yarn nodemon-userapi`. 

|Production | Development | 
| ----------|-------------| 
|[![Build Status](https://travis-ci.org/joanmiespada/pmp_empowered.svg?branch=production)](https://travis-ci.org/joanmiespada/pmp_empowered) | [![Build Status](https://travis-ci.org/joanmiespada/pmp_empowered.svg?branch=master)](https://travis-ci.org/joanmiespada/pmp_empowered)  |

# Setup

1) Create an account on Google Firebase.
2) Download credentials file with API keys. It's a json file with all info together. 
3) Create `.env` file in API folder with this structure:
```
FIREBASE_PRIVATE_KEY_CERT_FILE=<file name with the Firebase cert content>
FIREBASE_PRIVATE_KEY_ID=<copy here firebase private key ID>
FIREBASE_CLIENT_ID=<client id>
PASSWORD_SALT=<write a number between 5 to 100>
PASSWORD_JWT=<write random text with numbers and letters, 20 characters should be enought>
```

# Compile

Please, read package.json scripts section. You'll be able to find some interesting options.


# TODO

Add ELK support 
Add RabbitMQ support



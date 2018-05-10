import log4js from 'log4js'
import fs from 'fs'
import path from 'path'

try{
  fs.mkdirSync('./log')
}catch(err){
  if(err.code != 'EEXIST') {
    console.error('Could not set up log directory, error was: ', err)
    process.exit(1)
  }
}

log4js.configure(path.join(__dirname,'/../config/log4js.json'))


const loggerApp = log4js.getLogger('app')
const loggerHttp = log4js.getLogger('http')

module.exports ={ 
  log4js:log4js,
  app:loggerApp,
  http:loggerHttp
}

/*
logger.app.trace('Entering cheese testing');
logger.app.debug('Got cheese.');
logger.app.info('Cheese is Gouda.');
logger.app.warn('Cheese is quite smelly.');
logger.app.error('Cheese is too ripe!');
logger.app.fatal('Cheese was breeding ground for listeria.');

by decorators!!!!
function log(target, name, descriptor) {
        
            console.log(descriptor)
            console.log(arguments)

            let fn = descriptor.value;
            let newFn  = function() {
                //console.log(custompagarm, name);
                fn.apply(target, arguments);
                //console.log(custompagarm, name);
            };
            descriptor.value = newFn;
            return descriptor;
            
    
}
*/
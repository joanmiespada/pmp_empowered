import logger from './logsys'

exports.gracefulShutdown = (srv, customClose)=> {
    let server = srv
    return ()=>{
        
        server.close(()=>{               
                customClose()
                process.exit()
            })
        
        // if after 
        setTimeout(()=> {
            logger.error.info("Could not close connections in time, forcefully shutting down");
            process.exit()
        }, 10*1000);
    }
}
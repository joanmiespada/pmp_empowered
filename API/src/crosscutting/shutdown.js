import logger from './logsys'

exports.gracefulShutdown = (srv, customClose)=> {
    let server = srv
    return ()=>{
        
        logger.log.app("Received kill signal, shutting down gracefully.")
        server.close(()=>{
                logger.app.info("Closed out remaining connections.")
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
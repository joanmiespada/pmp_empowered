

import endpoint from './endpoint'
import messages from '../configs/messages'
import logger from '../crosscutting/logsys'

class loginapi
{

    constructor(router,business)
    {
        this.router= router
        this.urlbase = '/login'
        this.router.post('/', this.login(business))
        
    }

    login(businessLogic)
    {
        let business = businessLogic
        return (req,res) =>
        {
                console.log(req.body)
                business.login(req.body.email,req.body.password )
                    .then((opResult)=>{
                        logger.app.info(`user ${req.body.email} and id: ${opResult.id} has been logged sucessefully`)
                        res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
                        res.end( JSON.stringify({token: opResult.token}));
                    })
                    .catch((err)=>{
                        //console.log(`login err: ${messages.errNoEmailandPassword}`, err);
                        logger.app.error(`user ${req.body.email} hasn't been logged properly`,err)
                        res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
                        res.end( messages.errinternalServer);
                    } );
        }
    }
}

export default loginapi;



import userLogic from '../business/user' 
import endpoint from './endpoint'
import messages from '../configs/messages'


class loginapi
{

    constructor(router)
    {
        this.router= router;
        this.urlbase = '/login';
        this.router.post('/', this.login);
    }

    login(req,res)
    {
            let business = new userLogic();
            business.login(req.body.email,req.body.password )
                .then((opResult)=>{
                    res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
                    res.end( JSON.stringify(opResult));
                })
                .catch((err)=>{
                    console.log(`login err: ${messages.errNoEmailandPassword}`, err);
                    res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
                    res.end( messages.errinternalServer);
                } );
    }
}

export default loginapi;


import jwt from './encrypt'
import messages from './messages'

export class business
{
    constructor()
    {
    }

    checkUserToken(uToken) 
    {
        try{
            jwt.verifyJWTtoken(uToken)
        }catch(err){ throw new Error(messages.errTokenUserIdentification)}
    
    }
}
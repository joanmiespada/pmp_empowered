import jwt from './encrypt'
//import messages from '../configs/messages'

class business
{
    constructor()
    {
    }

    checkUserToken(uToken) 
    {
        try{
            jwt.verifyJWTtoken(uToken)
        }catch(err){ throw new Error('messages.errTokenUserIdentification')}
    
    }
}

export default business;
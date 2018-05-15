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
            //console.log('token: ' + uToken)
            const aux= jwt.verifyJWTtoken(uToken)

            //console.log(aux)
            return {result: true, data:aux}
        }catch(err){ 
            //console.log(err)
            //throw new Error(messages.errTokenUserIdentification)
            return {result: false, error:err }
        }
        
    }
}
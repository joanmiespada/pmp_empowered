import loginData from '../data/login'
import messages from '../configs/messages'
import createJWTtoken from '../crosscutting/encrypt'
import logger from '../crosscutting/logsys'

class loginLogic
{
    constructor()
    {
        this.userdata = new loginData();
    }

    login(email, password)
    {

        logger.app.debug(`email: ${email} pass: ${password}`)
        if(email === undefined || password === undefined )
        {     throw new Error(messages.errNoEmailandPassword)   }
        
        return new Promise( (resolve,reject) => {
            this.userdata.login(email, password).then( (result) =>{
                
                if(result.login)
                    {
                        const info = {
                            name: result.user.name,
                            id: result.id ,
                            profiles:['admin'] 
                        }    
                        let token = createJWTtoken.createJWTtoken(info)
                        resolve( {result:true, token:token, id:result.id}  ) 
                    }
                else
                    {resolve( {result:false, token:undefined } ) }
            }).catch(err=>reject(err))
        })  
    }

    logout(uToken)
    {
        logger.app.debug(`token: ${uToken}`)
        return true;
    }

}

export default loginLogic;
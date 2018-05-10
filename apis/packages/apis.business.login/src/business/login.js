
import messages from '../messages'
import {encrypt,logsys } from 'apis-core'

class loginLogic
{
    constructor( dataaccess)
    {
        this.userdata = dataaccess
    }

    login(email, password)
    {
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
                        let token = encrypt.createJWTtoken(info)
                        resolve( {result:true, token:token, id:result.id}  ) 
                    }
                else
                    {resolve( {result:false, token:undefined } ) }
            }).catch(err=>reject(err))
        })  
    }

    logout(uToken)
    {
        logsys.app.debug(`token: ${uToken}`)
        return true;
    }

}

export default loginLogic;
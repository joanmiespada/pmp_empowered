import loginData from '../data/login'
import messages from '../configs/messages';


class loginLogic
{
    constructor()
    {
        this.userdata = new loginData();
    }

    login(email, password)
    {
        
        if(email === undefined || password === undefined )
        {     throw new Error(messages.errNoEmailandPassword)   }
        
        return new Promise( (resolve,reject) => {
            this.userdata.login(email, password).then( (result) =>{
                //here resolve token
                
                if(result === true)
                    {resolve( {result:result, token:'sdfsddsffsdf' } ) }
                else
                    {resolve( {result:false, token:undefined } ) }
            }).catch(err=>reject(err))
        })  
    }

}

export default loginLogic;
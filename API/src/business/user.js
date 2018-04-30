
import userModel from '../models/user';
import { isNumber } from 'util';
import messages from '../configs/messages';
import apiparams from '../configs/apiparams';

class userLogic
{
    constructor(dataaccess)
    {
        this.userdata = dataaccess
    }

    mappingFromRequestToUserModel(params)
    {
        let use = new userModel() 
        use.Id = params.id
        use.Email = params.email
        use.Name = params.name
        use.Surname = params.surname
        use.Password = params.password
        return use
    }

    getAllUsers(uToken,pageSize,pageNum)
    {
        if (  pageSize>=apiparams.pageSizeMin && pageSize<=apiparams.pageSizeMax 
                            && isNumber(pageNum)  )
            return this.userdata.getAllUsers(pageSize,pageNum)
        else
            throw new Error(messages.errPageSizePageNum) 
    }

    createNewUser(params, userTokenRequired = true)
    {
        return new Promise( (resolve,reject) => {

            if(userTokenRequired && params.token === undefined) 
                { reject(messages.errTokenIsMandatory)  }

            if(params.email === undefined) 
                { reject(messages.errEmailIsMandatory)  }

            if(params.password === undefined) 
                { reject(messages.errPasswordIsMandatory)  }

            this.userdata.checkIfMailExists(params.email).then( (exists) => {
                if(exists)
                    resolve({result:false});
    
                let newuser = this.mappingFromRequestToUserModel(params);
                
                this.userdata.createNewUser(newuser).then( (result) => { 
                    
                    resolve(result) }  ).catch(err=>reject(err));
    
            }).catch(err=>reject(err))

        } );
    }

    getUserById(uToken,id)
    {
        return this.userdata.getUserById(id);
    }

    getUsersByEmail(uToken,email)
    {
        return this.userdata.getUsersByEmail(email);
    }

    deleteUserById(uToken,id,userTokenRequired = true)
    {
        return new Promise((resolve,reject)=>{
            if(userTokenRequired && uToken === undefined) 
                    { reject(messages.errTokenIsMandatory)  }

            this.userdata.deleteUserById(id)
                .then( (result)=> resolve(result) )
                .catch( (err) => reject(err))
        })
        
    }

    checkIfMailExists(uToken,email)
    {
        return this.userdata.checkIfMailExists(email);
    }

    updateUserById(uToken,id,params)
    {
        let usermod =  this.mappingFromRequestToUserModel(params);
        return this.userdata.updateUserById(id,usermod);
    }

}

export default userLogic;
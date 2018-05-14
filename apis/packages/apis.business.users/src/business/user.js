
import userModel from '../models/user'
import { isNumber } from 'util'
import messages from '../messages'
import {apiParams, business} from 'apis-core'
 

export class userLogic extends business
{
    constructor(dataaccess)
    {
        super();
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
        this.checkUserToken(uToken)  
        if (pageSize >= apiParams.pageSizeMin &&
            pageSize <= apiParams.pageSizeMax &&
            isNumber(pageNum))
                return this.userdata.getAllUsers(pageSize,pageNum)
        else
            throw new Error(messages.errPageSizePageNum) 
    }

    createNewUser(uToken,params, userTokenRequired = true)
    {
        return new Promise( (resolve,reject) => {

            if(userTokenRequired) 
                this.checkUserToken(uToken)

            if(params.email === undefined) 
                { reject(messages.errEmailIsMandatory)  }

            if(params.password === undefined) 
                { reject(messages.errPasswordIsMandatory)  }

            this.userdata.checkIfMailExists(params.email).then( (exists) => {
                if(exists)
                    resolve({result:false});
    
                let newuser = this.mappingFromRequestToUserModel(params);
                
                this.userdata.createNewUser(newuser).then( (result) => { 
                    
                    resolve(result) }  ).catch(err=>reject(err))
    
            }).catch(err=>reject(err))

        } );
    }

    getUserById(uToken,id)
    {
        this.checkUserToken(uToken)
        return this.userdata.getUserById(id)
    }

    getUsersByEmail(uToken,email)
    {
        this.checkUserToken(uToken)
        return this.userdata.getUsersByEmail(email)
    }

    deleteUserById(uToken,id,userTokenRequired = true)
    {
        return new Promise((resolve,reject)=>{
            if(userTokenRequired ) 
                this.checkUserToken(uToken)

            this.userdata.deleteUserById(id)
                .then( (result)=> resolve(result) )
                .catch( (err) => reject(err))
        })
        
    }

    checkIfMailExists(uToken,email)
    {
        this.checkUserToken(uToken)
        return this.userdata.checkIfMailExists(email);
    }

    updateUserById(uToken,id,params)
    {
        this.checkUserToken(uToken)
        let usermod =  this.mappingFromRequestToUserModel(params);
        return this.userdata.updateUserById(id,usermod);
    }

}

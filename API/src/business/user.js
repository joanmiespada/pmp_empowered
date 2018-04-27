import userData from '../data/user'
import userModel from '../models/user';
import { isNumber } from 'util';
import messages from '../configs/messages';
import apiparams from '../configs/apiparams';

class userLogic
{
    constructor()
    {
        this.userdata = new userData();
    }

    getAllUsers(pageSize,pageNum)
    {
        if (  pageSize>=apiparams.pageSizeMin && pageSize<=apiparams.pageSizeMax 
                            && isNumber(pageNum)  )
            return this.userdata.getAllUsers(pageSize,pageNum);
        else
            throw new Error(messages.errPageSizePageNum); 
    }

    mappingFromRequestToUserModel(params)
    {
        let use = new userModel();   
        use.Id = params.id;
        use.Email = params.email;
        use.Name = params.name;
        use.Surname = params.surname;
        use.Password = params.password;
        return use; 
    }

    createNewUser(params)
    {
        return new Promise( (resolve,reject) => {

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

    getUserById(id)
    {
        return this.userdata.getUserById(id);
    }

    getUsersByEmail(email)
    {
        return this.userdata.getUsersByEmail(email);
        //return this.userdata.getAllUsers(10,1);
    }

    deleteUserById(id)
    {
        return this.userdata.deleteUserById(id); 
    }

    checkIfMailExists(email)
    {
        return this.userdata.checkIfMailExists(email);
    }

    updateUserById(id,params)
    {
        let usermod =  this.mappingFromRequestToUserModel(params);
        return this.userdata.updateUserById(id,usermod);
    }

}

export default userLogic;
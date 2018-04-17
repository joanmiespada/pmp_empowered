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
        return use; 
    }

    async createNewUser(params)
    {
        let exists = await this.userdata.checkIfMailExists(params.email);
        if(exists)
            return {result:false}; 
        
        let newuser = this.mappingFromRequestToUserModel(params);
        return this.userdata.createNewUser(newuser);
       
    }

    checkIfMailExists(email)
    {
        return this.userdata.checkIfMailExists(email);
    }

}

export default userLogic;

import user from '../models/user';
import userlogic from '../business/user' 
import { isNumber } from 'util';
import endpoint from './endpoint';
import messages from '../configs/messages'; 

class userapi extends endpoint
{

    constructor(router)
    {
        super(router);
        this._urlbase = '/users';
    }

    async createNew(req,res, next)
    {
        res.status(endpoint.Http201).json(new user());
    }

    async getById(req,res, next)
    {
        let userId = req.params.id;
        res.json(new user());
    }

    async updateById(req,res, next)
    {
        res.status(endpoint.Http201).json(new user())
    }

    async deleteById(req,res, next)
    {
        res.status(endpoint.Http204).end()
    }

    async getAll(req,res, next)
    {

        let pageSize= req.params.pageSize;
        let pageNumber= req.params.pageNumber;
 
        pageSize = Number.parseInt(pageSize);
        pageNumber = Number.parseInt(pageNumber);
        if( !isNumber(pageSize) || !isNumber(pageNumber))
        {
            res.writeHead(endpoint.Http400, endpoint.ContentTextPlain);
            res.end(messages.wrongPageSize);
            return;
        }

        try{
            
            let business = new userlogic();
            let listOfusers = await business.getAllUsers(pageSize,pageNumber); 
            
            res.writeHead(endpoint.Http200, endpoint.ContentTextJson);
            res.end( JSON.stringify(listOfusers));

        }catch(err){
            console.log( messages.errGettingUsers, err);
            res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
            res.end( messages.errinternalServer);
        }
    }


}

export default userapi;




import userLogic from '../business/user' 
import { isNumber } from 'util';
import endpoint from './endpoint';
import messages from '../configs/messages'; 

function extracPageNumberPageSize(params)
{
    let pageSize= params.pageSize;
    let pageNumber= params.pageNumber;

    pageSize = Number.parseInt(pageSize);
    pageNumber = Number.parseInt(pageNumber);
    if( !isNumber(pageSize) || !isNumber(pageNumber))
        return undefined;
    else
        return {'pageSize':pageSize,'pageNumber':pageNumber }

}

class userapi extends endpoint
{

    constructor(router)
    {
        super(router);
        this._urlbase = '/users';
    }

    async createNew(req,res, next)
    {
        
        try{
            
            let business = new userLogic();
            let opResult = await business.createNewUser(req.body);

            if(opResult.result === true)
            {
                res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
                res.end( JSON.stringify(opResult));
            }else
            {
                res.writeHead(endpoint.Http400, endpoint.ContentTextPlain);
                res.end();
            }

        }catch(err){
            console.log( messages.errGettingUsers, err);
            res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
            res.end( messages.errinternalServer);
        }
    }

    async getById(req,res, next)
    {
        let userId = req.params.id;
        res.json(new userModel());
    }

    async updateById(req,res, next)
    {

        res.status(endpoint.Http201).json(new userModel())
    }

    async deleteById(req,res, next)
    {
        res.status(endpoint.Http204).end()
    }

    async getAll(req,res, next)
    {
        let position = extracPageNumberPageSize(req.params);
        if( position === undefined )
        {
            res.writeHead(endpoint.Http400, endpoint.ContentTextPlain);
            res.end(messages.wrongPageSize);
            return;
        }

        try{
            
            let business = new userLogic();
            let listOfusers = await business.getAllUsers(position.pageSize,
                                                         position.pageNumber); 
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


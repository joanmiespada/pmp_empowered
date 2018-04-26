
import userLogic from '../business/user' 
import { isNumber } from 'util'
import endpoint from './endpoint'
import messages from '../configs/messages'

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

    createNew(req,res)
    {   
        let business = new userLogic();
        business.createNewUser(req.body).then( (opResult)=> {
            if(opResult.result === true)
            {
                res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
                res.end( JSON.stringify(opResult));
            }else
            {
                res.writeHead(endpoint.Http400, endpoint.ContentTextPlain);
                res.end();
            }
        }).catch( (err)=>{
            console.log( messages.errGettingUsers, err);
            res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
            res.end( messages.errinternalServer);
        }); 
        
    }

    getById(req,res)
    {           
        let business = new userLogic();
        business.getUserById(req.params.id)
        .then((opResult)=>{
            res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
            res.end( JSON.stringify(opResult));  
        })
        .catch( (err)=>{
            console.log( messages.errGettingUsers, err);
            res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
            res.end( messages.errinternalServer);
        });         
    }

    updateById(req,res)
    {
        let business = new userLogic();
        business.updateUserById(req.params.id,req.body)
        .then((opResult)=> {
            res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
            res.end( JSON.stringify(opResult)); 
        })
        .catch( (err)=>{
            console.log( messages.errGettingUsers, err);
            res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
            res.end( messages.errinternalServer);
        });      
    }

    deleteById(req,res)
    {
        let business = new userLogic();
        business.deleteUserById(req.params.id)
        .then((opResult)=> {
            res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
            res.end( JSON.stringify(opResult)); 
        })
        .catch( (err)=>{
            console.log( messages.errGettingUsers, err);
            res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
            res.end( messages.errinternalServer);
        });   
    }

    getAll(req,res)
    {
        let position = extracPageNumberPageSize(req.params);
        if( position === undefined )
        {
            res.writeHead(endpoint.Http400, endpoint.ContentTextPlain);
            res.end(messages.wrongPageSize);
            return;
        }    
        let business = new userLogic();
        business.getAllUsers(position.pageSize, position.pageNumber)
        .then((listOfusers)=>{
            res.writeHead(endpoint.Http200, endpoint.ContentTextJson);
            res.end( JSON.stringify(listOfusers));
        })
        .catch( (err)=>{
            console.log( messages.errGettingUsers, err);
            res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
            res.end( messages.errinternalServer);
        });   
    }
}

export default userapi;


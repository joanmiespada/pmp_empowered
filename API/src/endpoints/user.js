

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

    constructor(router, business)
    {
        super(router,business)
        this._urlbase = '/users'
        
    }

    createNew(business){
        return (req,res)=>
        {   
            business.createNewUser(req.body).then( (opResult)=> {
                if(opResult.result === true)
                {
                    this._log.debug(`new user created`)
                    res.writeHead(endpoint.Http201, endpoint.ContentTextJson)
                    res.end( JSON.stringify(opResult))
                }else
                {
                    res.writeHead(endpoint.Http400, endpoint.ContentTextPlain)
                    res.end()
                }
            }).catch( (err)=>{
                //console.log( messages.errGettingUsers, err);
                this._log.error(`error creating new user`,err)
                res.writeHead(endpoint.Http500, endpoint.ContentTextPlain)
                res.end( messages.errinternalServer)
            }); 
            
        }
    }

    getById(business)
    {
        (req,res)=>
        {           
            business.getUserById(req.params.id)
            .then((opResult)=>{
                res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
                res.end( JSON.stringify(opResult));  
            })
            .catch( (err)=>{
                //console.log( messages.errGettingUsers, err)
                this._log.error(`error getting user by id: ${req.params.id}`,err)
                res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
                res.end( messages.errinternalServer);
            });         
        }
    }

    updateById(business){
        (req,res)=>
        {
            business.updateUserById(req.params.id,req.body)
            .then((opResult)=> {
                res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
                res.end( JSON.stringify(opResult)); 
            })
            .catch( (err)=>{
                //console.log( messages.errGettingUsers, err);
                this._log.error(`error updating user by id: ${req.params.id}`,err)
                res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
                res.end( messages.errinternalServer);
            });      
        }
    }

    deleteById(business){
        (req,res)=>
        {
            business.deleteUserById(req.params.id)
            .then((opResult)=> {
                res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
                res.end( JSON.stringify(opResult)); 
            })
            .catch( (err)=>{
                //console.log( messages.errGettingUsers, err);
                this._log.error(`error deleting user by id: ${req.params.id}`,err)
                res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
                res.end( messages.errinternalServer);
            });   
        }
    }

    getAll(business){
        (req,res)=>
        {
            let position = extracPageNumberPageSize(req.params);
            if( position === undefined )
            {
                res.writeHead(endpoint.Http400, endpoint.ContentTextPlain);
                res.end(messages.wrongPageSize);
                return;
            }    

            business.getAllUsers(position.pageSize, position.pageNumber)
            .then((listOfusers)=>{
                res.writeHead(endpoint.Http200, endpoint.ContentTextJson);
                res.end( JSON.stringify(listOfusers));
            })
            .catch( (err)=>{
                //console.log( messages.errGettingUsers, err);
                this._log.error(`error getting all user pageSize: ${position.pageSize} pageNum: ${position.pageNumber}`,err)
                res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
                res.end( messages.errinternalServer);
            });   
        }
    }
}

export default userapi;


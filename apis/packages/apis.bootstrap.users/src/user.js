
import { isNumber } from 'util'
import {endpoint} from 'apis-core'
import messages from 'apis-core'
//------
//import {logsys as logger} from 'apis-core'

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
        //this._log = logger.app
        //this._router = router
        //this.setup(business)
         //Retrieve all users
         //this._router.get('/:pageSize/:pageNumber', this.getAll(business)  )
         //this._router.get('/', (req,res)=>{ console.log('werwerwe') }  )
         //create a new user
        // this._router.post('/', this.createNew(business));
         //Retrieve single user
        // this._router.get('/:id', this.getById(business));
         //Update user by Id
        // this._router.put('/:id', this.updateById(business));
         //Delete user by Id
       //  this._router.delete('/:id', this.deleteById(business));
        //------
        this._urlbase = '/users'
        
        
    }

    get router() {  return this._router }
    get urlbase() { return this._urlbase }

    createNew(business){
        return (req,res)=>
        {   
            business.createNewUser(req.headers.token,req.body).then( (opResult)=> {
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
        return (req,res)=>
        {           
            business.getUserById(req.headers.token,req.params.id)
            .then((opResult)=>{
                res.writeHead(endpoint.Http201, endpoint.ContentTextJson);
                res.end( JSON.stringify(opResult));  
            })
            .catch( (err)=>{
                //console.log( messages.errGettingUsers, err)
                console.log('sdfsdfsdfsdsfds')
                this._log.error(`error getting user by id: ${req.params.id}`,err)
                res.writeHead(endpoint.Http500, endpoint.ContentTextPlain);
                res.end( messages.errinternalServer);
            });         
        }
    }

    updateById(business){
        return (req,res)=>
        {
            console.log(req)
            business.updateUserById(req.headers.token,req.params.id,req.body)
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
        return (req,res)=>
        {
            business.deleteUserById(req.headers.token,req.params.id)
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
        return (req,res)=>
        {
            let position = extracPageNumberPageSize(req.params);
            if( position === undefined )
            {
                res.writeHead(endpoint.Http400, endpoint.ContentTextPlain);
                res.end(messages.wrongPageSize);
                return;
            }    
            business.getAllUsers(req.headers.token, position.pageSize, position.pageNumber)
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


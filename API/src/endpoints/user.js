
import user from '../models/user';
import userlogic from '../business/user' 
import { isNumber } from 'util';
import endpoint from './endpoint'; 

class userapi extends endpoint
{

    constructor(router)
    {
        super(router);
        this._urlbase = '/users';
    }

    async createNew(req,res, next)
    {
        res.status(201).json(new user());
    }

    async getById(req,res, next)
    {
        let userId = req.params.id;
        res.json(new user());
    }

    async updateById(req,res, next)
    {
        res.status(201).json(new user())
    }

    async deleteById(req,res, next)
    {
        res.status(204).end()
    }

    async getAll(req,res, next)
    {
    
        console.log(req.params);
        let pageSize= req.params.pagesize;
        let pageNumber= req.params.pagenumber;

        pageSize = Number.parseInt(pageSize);
        pageNumber = Number.parseInt(pageNumber);
        if( !isNumber(pageSize) || !isNumber(pageNumber))
        {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('wrong pageNumber and/or pageSize params');
            return;
        }

        try{
            
            let business = new userlogic();
            let listOfusers = await business.getAllUsers(pageSize,pageNumber); 
            console.log(listOfusers)
            res.writeHead(200, {'Content-Type': 'text/json'});
            res.end( JSON.stringify(listOfusers));

        }catch(err){
            console.log('Error getting users', err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal server error');
        }
    }


}

export default userapi;


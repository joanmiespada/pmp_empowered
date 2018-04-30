import logger from '../crosscutting/logsys'

const N200 = 200;
const N201 = 201;
const N204 = 204;
const N400 = 400;
const N403 = 403;
const N500 = 500;
const contentTextPlain = {'Content-Type': 'text/plain'}
const contentTextJson = {'Content-Type': 'text/json'}

class endpoint
{
   static get Http200(){return N200}
   static get Http201(){return N201}
   static get Http204(){return N204}
   static get Http400(){return N400}
   static get Http403(){return N403}
   static get Http500(){return N500}

   static get ContentTextPlain(){ return contentTextPlain;}
   static get ContentTextJson(){ return contentTextJson;}

    constructor(router,business)
    {
        this._log = logger.app;
        this._router = router;
        this.setup(business);
    }

    get router() {  return this._router; }
    get urlbase() { return this._urlbase; }

    setup(business){

        //Retrieve all users
        this._router.get('/:pageSize/:pageNumber', this.getAll(business));
        //create a new user
        this._router.post('/', this.createNew(business));
        //Retrieve single user
        this._router.get('/:id', this.getById(business));
        //Update user by Id
        this._router.put('/:id', this.updateById(business));
        //Delete user by Id
        this._router.delete('/:id', this.deleteById(business));
                
    }
/*
    createNew(){}
    getById(){}
    updateById(){}
    deleteById(){}
    getAll(){}
    */

}

export default endpoint;
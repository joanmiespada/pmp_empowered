

class endpoint
{

    constructor(router)
    {
        this._router= router;
        this.setup();
    }

    get router() {  return this._router; }
    get urlbase() { return this._urlbase; }

    setup(){

        //Retrieve all users
        this._router.get('/:pageSize/:pageNumber', this.getAll);
        //create a new user
        this._router.post('/', this.createNew);
        //Retrieve single user
        this._router.get('/:id', this.getById);
        //Update user by Id
        this._router.put('/:id', this.updateById);
        //Delete user by Id
        this._router.delete('/:id', this.deleteById);
                
    }

    async createNew(req,res, next){}

    async getById(req,res, next){}

    async updateById(req,res, next){}

    async deleteById(req,res, next){}

    async getAll(req,res, next){}

}

export default endpoint;
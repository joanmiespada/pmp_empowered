class eventapi
{

    constructor(router)
    {
        this._router= router;
        this._urlbase = '/events';
        this.setup();
    }

    get router() {  return this._router; }
    get urlbase() { return this._urlbase; }

    setup(){

        this._router.get('/', this.emit_events);
   
    }


    emit_events(req,res, next)
    {
    
        try{
            
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');

            // send a ping approx every 2 seconds
            var timer = setInterval(() => {
                res.write('data: ping\n\n')

                // !!! this is the important part
                res.flush()
            }, 2000);

            res.on('close', () => {
                clearInterval(timer)
            });

        }catch(err){
            console.log('Error getting documents', err);
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('wrong header');
        }
    }


}

export default eventapi;
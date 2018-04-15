import endpoint from './endpoint';
import messages from '../configs/messages'; 

const twoSeconds=2000;

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
                res.write('data: ping test\n\n')

                // !!! this is the important part
                res.flush()
            }, twoSeconds);

            res.on('close', () => {
                clearInterval(timer)
            });

        }catch(err){
            console.log('Error getting data', err);
            res.writeHead(endpoint.Http400, endpoint.ContentTextPlain);
            res.end(messages.errWrongHeader);
        }
    }


}

export default eventapi;
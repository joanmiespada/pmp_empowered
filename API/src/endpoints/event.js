import endpoint from './endpoint';
import messages from '../configs/messages'; 
import { EventEmitter } from 'events';

class eventapi extends EventEmitter
{

    constructor(router)
    {
        super();
        //this.httpResult = undefined; 
        this._urlbase = '/events';
        this._router= router;
        this.setup();
        
    }

    get router() {  return this._router; }
    get urlbase() { return this._urlbase; }

    setup(){

        this._router.get('/', this.emit_events(this));
   
        this.on('datachange', (message, ctx) => {

            if(ctx.httpResult === undefined) return;

            let aux = { message: message, timestamp: Date.now() }
            let str= JSON.stringify(aux);
            ctx.httpResult.write( str+'\n');
            ctx.httpResult.flush(); 
        });
        
    }

    emit_events(context)
    {
        let aux = context; 
        return (req,res)=>{
            try{
            
                res.setHeader('Content-Type', 'text/event-stream');
                res.setHeader('Cache-Control', 'no-cache');
    
                aux.httpResult =  res; 
                /// send a ping approx every 2 seconds
                var timer = setInterval((obj) => {
                   // console.log('sssss')
                   // res.write('data: ping test\n\n')
                    obj.emit('datachange','hello');
                    // !!! this is the important part
                   // res.flush()
                }, 1000, aux);
    
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
}

export default eventapi;
import expect from 'expect'
import request from 'request'

describe('login testing', ()=>{

    const options = {
        url:'http://127.0.0.1:8080/v1/login',
        method: 'POST',
        json: {
            email:'repefi@nej.hr',
            password:'pepe'
        }
    }

    let uToken = undefined
    it('login ok', async()=>{ 
        try{
            request(options ,(err,res, body ) => {
                if (err) { console.log(err); expect(false).toEqual(true); return; }
                uToken = body.token; 
                expect(uToken).toBeTruthy()
            })
            
        }catch(err){
            expect(false).toEqual(true)
        }
    })
})
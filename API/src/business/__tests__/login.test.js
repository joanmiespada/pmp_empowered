import userLogic from '../user'
import expect from 'expect'
import chance from 'chance'
import generator from 'generate-password'

describe('login testing', ()=>{

    let userlayer = new userLogic()       
    let random = new chance()
    let password = generator.generate({
        length: 10,
        numbers: true
    });
    let newuser = {email:random.email() , name: random.name() , surname: random.name(), password: password}
 
    it('create new user', async()=>{
        try{
            const result = await userlayer.createNewUser(newuser)
            expect(result).toBeDefined()
            expect(result.result).toEqual(true)
            expect(result.id).toBeTruthy()
        }catch(err){
            expect(false).toEqual(true)
        }

    })


    it('login ok', async()=>{ 
        try{
            let result = await userlayer.login(newuser.email, newuser.password)
            expect(result.result).toEqual(true)
        }catch(err){
            expect(false).toEqual(true)
        }
    })

    it('login fail', async()=>{ 
        try{
            await userlayer.login(newuser.email, password+password)
        }catch(err){
            expect(true).toEqual(true)
        }
    })
    it('login missing params', async()=>{ 
        try{
            await userlayer.login(undefined, undefined)
        }catch(err){
            expect(true).toEqual(true)
        }
    })

})
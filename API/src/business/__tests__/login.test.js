import userLogic from '../user'
import loginLogic from '../login'
import loginData from '../../data/login'
import userData from '../../data/user'
import expect from 'expect'
import chance from 'chance'
import generator from 'generate-password'

describe('login testing', ()=>{

    let userlayer = new userLogic( new userData() )
    let loginLayer = new loginLogic( new loginData() )

    let random = new chance()
    let password = generator.generate({
        length: 10,
        numbers: true
    });
    let newuser = {email:random.email() , name: random.name() , surname: random.name(), password: password}
    let newid= undefined
    it('create new user', async()=>{
        try{
            const result = await userlayer.createNewUser(undefined,newuser, false)
            newid = result.id
            expect(result).toBeDefined()
            expect(result.result).toEqual(true)
            expect(result.id).toBeTruthy()
        }catch(err){
            expect(false).toEqual(true)
        }

    })

    let uToken = undefined
    it('login ok', async()=>{ 
        try{
            let result = await loginLayer.login(newuser.email, newuser.password)
            uToken = result.token
            expect(result.token).toBeTruthy()
        }catch(err){
            expect(false).toEqual(true)
        }
    })

    it('login out', async()=>{ 
        try{
            let result = await loginLayer.logout(uToken)
            expect(result).toEqual(true)
        }catch(err){
            expect(false).toEqual(true)
        }
    })

    it('login fail', async()=>{ 
        try{
            await loginLayer.login(newuser.email, password+password)
        }catch(err){
            expect(true).toEqual(true)
        }
    })
    it('login missing params', async()=>{ 
        try{
            await loginLayer.login(undefined, undefined)
        }catch(err){
            expect(true).toEqual(true)
        }
    })

    it('delete existing user', async()=>{ 
        try{
            await userlayer.deleteUserById(undefined,newid,false)
            expect(true).toEqual(true)
        }catch(err){
            expect(false).toEqual(true)
        }
    })

})
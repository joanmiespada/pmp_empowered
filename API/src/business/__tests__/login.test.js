import userLogic from '../user'
import loginLogic from '../login'
import expect from 'expect'
import chance from 'chance'
import generator from 'generate-password'
import logger from '../../crosscutting/logsys'

beforeEach(() => {
    logger.app.info('Starting.....');
  });

describe('login testing', ()=>{

    let userlayer = new userLogic()
    let loginLayer = new loginLogic()

    let random = new chance()
    let password = generator.generate({
        length: 10,
        numbers: true
    });
    let newuser = {email:random.email() , name: random.name() , surname: random.name(), password: password}
    let newid= undefined
    it('create new user', async()=>{
        try{
            const result = await userlayer.createNewUser(newuser)
            newid = result.id
            expect(result).toBeDefined()
            expect(result.result).toEqual(true)
            expect(result.id).toBeTruthy()
        }catch(err){
            expect(false).toEqual(true)
        }

    })


    it('login ok', async()=>{ 
        try{
            let result = await loginLayer.login(newuser.email, newuser.password)
            expect(result.result).toEqual(true)
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
            await userlayer.deleteUserById(newid)
            expect(true).toEqual(true)
        }catch(err){
            expect(false).toEqual(true)
        }
    })

})
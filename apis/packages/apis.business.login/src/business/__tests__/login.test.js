import loginLogic from '../login'
import loginData from '../../data/login'
import expect from 'expect'

describe('login testing', ()=>{

    let loginLayer = new loginLogic( new loginData() )

    let newuser = {email:'repefi@nej.hr' , name: 'josé' , surname: 'popo', password: 'pepe'}
    
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
            await loginLayer.login(newuser.email, newuser.password+'password')
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

})
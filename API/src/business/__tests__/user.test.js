import userModel from '../../models/user'
import userLogic from '../user'
import expect from 'expect'
import chance from 'chance'

jest.mock('../__mocks__/usermock')


describe('user testing', ()=>{

    let userlayer = new userLogic()       
    let random = new chance()
    let newuser = {email:random.email() , name: random.name() , surname: random.name()}
    let newid=undefined
    it('create new user', async()=>{
        
        const result = await userlayer.createNewUser(newuser)
        newid = result.id;
        expect(result).toBeDefined()
        expect(result.result).toEqual(true)
        expect(result.id).toBeTruthy()

    })

    it('check if email exist', async()=>{ 
        try{
            let result = await userlayer.checkIfMailExists(newuser.email)
            expect(true).toEqual(true)
        }catch(err){
            expect(false).toEqual(true)
        }
    })

    it('get user by id', async()=>{ 
        try{
            let result = await userlayer.getUserById(newid)
            expect(result).toBeDefined()
            expect(result.id).toEqual(newid)
        }catch(err){
            expect(false).toEqual(true)
        }
    })

    it('get users by email', async()=>{ 
        try{
            let result = await userlayer.getUsersByEmail(newuser.email)
            expect(result[0]).toBeDefined()
            console.log(result);
            //expect(result[0].email).toEqual(newuser.email)
        }catch(err){
            expect(false).toEqual(true)
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

    it('delete non existing user', async()=>{ 
        try{
            await userlayer.deleteUserById('sdfsdfsdfsdf')
            expect(false).toEqual(true)
        }catch(err){
            expect(true).toEqual(true)
        }
    })

})
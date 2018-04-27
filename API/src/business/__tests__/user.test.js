import userLogic from '../user'
import expect from 'expect'
import chance from 'chance'
import generator from 'generate-password'

describe('user testing', ()=>{

    let userlayer = new userLogic()       
    let random = new chance()
    let password = generator.generate({
        length: 10,
        numbers: true
    });
    let newuser = {email:random.email() , name: random.name() , surname: random.name(), password: password}
    let newid=undefined
    it('create new user', async()=>{
        try{
            const result = await userlayer.createNewUser(newuser)
            newid = result.id;
            expect(result).toBeDefined()
            expect(result.result).toEqual(true)
            expect(result.id).toBeTruthy()
        }catch(err){
            expect(false).toEqual(true)
        }

    })

    it('create new user with same email', async()=>{
        
        try{
            await userlayer.createNewUser(newuser)
        }catch(err){
            expect(true).toEqual(true)
        }

    })

    it('create new user missing info ', async()=>{
        
        try{
            await userlayer.createNewUser({})
        }catch(err){
            expect(true).toEqual(true)
        }

    })
    it('check if email exist', async()=>{ 
        try{
            let result = await userlayer.checkIfMailExists(newuser.email)
            expect(result).toEqual(true)
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
            expect(result[0].email).toEqual(newuser.email)
        }catch(err){
            expect(false).toEqual(true)
        }
    })

    it('update users by id', async()=>{ 
        try{
            let result = await userlayer.updateUserById (newid,{email:random.email() })
            expect(result).toEqual(true)
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
            //expect(false).toEqual(true)
        }catch(err){
            expect(true).toEqual(true)
        }
    })

    it('get all users', async()=>{ 
        try{
            let list= await userlayer.getAllUsers (10,1)
            expect(list).toBeDefined()
        }catch(err){
            expect(false).toEqual(true)
        }
    })

    it('get all users wrong params', async()=>{ 
        try{
             await userlayer.getAllUsers (0,0)
            //expect(list).toBeDefined()
        }catch(err){
            expect(true).toEqual(true)
        }
    })

})
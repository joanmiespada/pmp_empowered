import {firebase, encrypt} from 'apis-core'
import userModel from '../models/user'
import uuid from 'uuid/v1'
import messages from '../messages'


export class userData
{
    mappingFromStorageToUserModel(id,user)
    {
        let use = new userModel()   
        use.Id = id
        use.Email = user.email
        use.Name = user.name
        use.Surname = user.surname
        use.Password = user.password
        return use
    }

    getAllUsers(pageSize,pageNum)
    {

        return new Promise( (resolve, reject) => {

            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable))
            let userRef = firebase.db.collection( firebase.tables.users )
            let query = userRef.orderBy('data.surname').startAt(pageSize * (pageNum-1) ).limit(pageSize);
            
            query.get().then( (snapshot) => {  

                let result = [];
                if(snapshot.empty) return result

                snapshot.forEach((doc) => {           
                    const userInfo = doc.data()
                    const user = this.mappingFromStorageToUserModel(doc.id,userInfo.data )
                    user.password='****'
                    result.push(user)
                });
                resolve(result)
            }).catch( (err) => { reject(err); } )
        });
    }

    createNewUser(usermodel)
    {
        return new Promise( (resolve,reject)=>{
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable));
            let userRef = firebase.db.collection( firebase.tables.users );
            let id = uuid();
            let newUserDocRef = userRef.doc(id);
            
            encrypt.cryptPassword(usermodel.password).then( (pass_hash)=> { 

                let obj={
                    meta:{
                        email : 'string',
                        name : 'string',
                        surname : 'string',
                        password:  'string'
                    },
                    data:{  
                        email : usermodel.email,
                        name : usermodel.name,
                        surname : usermodel.surname,
                        password: pass_hash
                    }
                };
    
                newUserDocRef.set(obj).then( ()=>resolve({result:true, id:id }) ).catch((err) => { reject(err); });
                
            }).catch( (err) => { reject(err); } );

            
        });
    }

    updateUserById(id, usermodel)
    {
        return new Promise( (resolve,reject)=>{
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable));

            let userRef = firebase.db.collection( firebase.tables.users );
            let newUserDocRef = userRef.doc(id);
            newUserDocRef.get().then(doc=>{

                if(!doc.exists){ reject(messages.errNoUserExistWithId)}

                let userInDb = doc.data();

                if(usermodel.email != undefined)
                    userInDb.data.email = usermodel.email;
                if(usermodel.name != undefined)
                    userInDb.data.name = usermodel.name;
                if(usermodel.surname != undefined)
                    userInDb.data.surname = usermodel.surname;

                newUserDocRef.set(userInDb);
                resolve(true);
            }).catch(err=> reject(err));
        });
    }

    checkIfMailExists(email)
    {
        return new Promise( (resolve,reject) => {
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable))

            let userRef = firebase.db.collection( firebase.tables.users )
            let query = userRef.where('data.email','==',email )
            
            query.get().then((snapshot) => { 
                    if(snapshot.size === 0)
                        resolve(false)
                    else
                        resolve(true)
            }).catch((err) => {reject(err)})
        });
    }

    deleteUserById(id)
    {
        return new Promise( (resolve, reject) => {
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable))

            let userRef = firebase.db.collection( firebase.tables.users ).doc(id)
            userRef.delete().then(()=>{resolve(true)}).catch(err=>reject(err))
        });
    }
    
    getUserById(id)
    {
        return new Promise( (resolve, reject) => {
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable))

            let userRef = firebase.db.collection( firebase.tables.users ).doc(id)
            userRef.get().then((doc)=>{
                const userDataMeta = doc.data()
                const user = this.mappingFromStorageToUserModel(doc.id,userDataMeta.data )
                user.password='****'
                resolve(user)
            }).catch(err=>reject(err))
        });
    }

    getUsersByEmail(email)
    {
        return new Promise( (resolve, reject) => {
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable))

            let userRef = firebase.db.collection( firebase.tables.users )
            let query = userRef.where('data.email','==',email )

            query.get().then( (snapshot) => {  

                let result = []
                if(snapshot.empty) return result

                snapshot.forEach((doc) => {
                    const userDataMeta = doc.data()           
                    const user = this.mappingFromStorageToUserModel(doc.id, userDataMeta.data)
                    user.password='****'
                    result.push(user)
                });
                
                resolve(result);
            }).catch( (err) => { reject(err); } );
            
        });
    }

}

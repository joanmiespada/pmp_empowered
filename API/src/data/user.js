import * as firebase from '../configs/firebase';
import userModel from '../models/user';
import uuid from 'uuid/v1';
import messages from '../configs/messages';

class userData
{
    mappingFromStorageToUserModel(id,user)
    {
        let use = new userModel();   
        use.Id = id;
        use.Email = user.email;
        use.Name = user.name;
        use.Surname = user.surname;
        return use; 
    }

    getAllUsers(pageSize,pageNum)
    {

        return new Promise( (resolve, reject) => {

            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable))
            let userRef = firebase.db.collection( firebase.tables.users );
            let query = userRef.orderBy('surname').startAt(pageSize * (pageNum-1) ).limit(pageSize);

            query.get().then( (snapshot) => {  

                let result = [];
                if(snapshot.empty) return result;

                snapshot.forEach((doc) => {           
                    result.push(this.mappingFromStorageToUserModel(doc.id, doc.data()));
                });
                resolve(result);
            }).catch( (err) => { reject(err); } );
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
            
            let obj={  
                email : usermodel.email,
                name : usermodel.name,
                surname : usermodel.surname
            };

            newUserDocRef.set(obj);
            resolve({result:true, id:id });
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
                    userInDb.email = usermodel.email;
                if(usermodel.name != undefined)
                    userInDb.name = usermodel.name;
                if(usermodel.surname != undefined)
                    userInDb.surname = usermodel.surname;

                newUserDocRef.set(userInDb);
                resolve(true);
            }).catch(err=> reject(err));
        });
    }

    checkIfMailExists(email)
    {
        return new Promise( (resolve,reject) => {
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable));

            let userRef = firebase.db.collection( firebase.tables.users );
            let query = userRef.where('email','==',email );
            
            query.get().then((snapshot) => { 
                    if(snapshot.size === 0)
                        resolve(false);
                    else
                        resolve(true);
            }).catch((err) => {reject(err)});
        });
    }

    deleteUserById(id)
    {
        return new Promise( (resolve, reject) => {
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable));

            let userRef = firebase.db.collection( firebase.tables.users ).doc(id);
            userRef.delete().then(()=>{resolve(true)}).catch(err=>reject(err));
        });
    }
    
    getUserById(id)
    {
        return new Promise( (resolve, reject) => {
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable));

            let userRef = firebase.db.collection( firebase.tables.users ).doc(id);
            userRef.get().then((doc)=>{
                let user = this.mappingFromStorageToUserModel(doc.id, doc.data())
                resolve(user);
            }).catch(err=>reject(err));
        });
    }

    getUsersByEmail(email)
    {
        return new Promise( (resolve, reject) => {
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable));

            let userRef = firebase.db.collection( firebase.tables.users );
            let query = userRef.where('email','==',email );

            query.get().then( (snapshot) => {  

                let result = [];
                if(snapshot.empty) return result;

                snapshot.forEach((doc) => {           
                    result.push(this.mappingFromStorageToUserModel(doc.id, doc.data()));
                });
                
                resolve(result);
            }).catch( (err) => { reject(err); } );
            
        });
    }
}

export default userData;
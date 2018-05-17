import {firebase, encrypt, utils as _u } from 'apis-core'
import keys from '../support/keys'


export class loginData
{
    login(email,passwordPlain)
    {
        return new Promise( (resolve, reject) => {
            
            if(firebase.db === undefined){
                reject( _u.jsonError(keys.errServerDataIsUnavailable))
                return
            }
            
            let userRef = firebase.db.collection( firebase.tables.users )
            let query = userRef.where('data.email','==',email )

            query.get().then( (snapshot) => {  

                let result, id
                if(snapshot.empty || snapshot.size >1) 
                    {  
                        resolve( {login:false} ) 
                        return
                    }

                snapshot.forEach((doc) => {           
                    result =  doc.data()
                    id = doc.id
                });
                
                encrypt.comparePassword(passwordPlain,result.data.password)
                        .then( (canIlogin) => {
                            if(canIlogin)
                                resolve( {login:true, user: result.data, id:id} )
                            else
                                resolve( {login:false} )
                        })
                        .catch( (err) =>  reject(err)  )
            }).catch( (err) => { reject(err); } )
        })
    }
}

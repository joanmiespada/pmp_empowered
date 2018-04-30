import * as firebase from '../configs/firebase'
import messages from '../configs/messages'
import encrypt from '../crosscutting/encrypt'

class loginData
{
    login(email,passwordPlain)
    {
        return new Promise( (resolve, reject) => {
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable))

            let userRef = firebase.db.collection( firebase.tables.users )
            let query = userRef.where('data.email','==',email )

            query.get().then( (snapshot) => {  

                let result, id
                if(snapshot.empty || snapshot.size >1) 
                    {  reject(messages.errNotUserFoundByEmail)  }

                snapshot.forEach((doc) => {           
                    result =  doc.data()
                    id = doc.id
                });
                
                encrypt.comparePassword(passwordPlain,result.data.password)
                        .then( (canIlogin) => {
                            if(canIlogin)
                                resolve({login:true, user: result.data, id:id})
                            else
                                resolve({login:false, user: undefined, id:undefined})
                        })
                        .catch( (err) =>  reject(err)  );
            }).catch( (err) => { reject(err); } );
            
        });
    }


}

export default loginData;
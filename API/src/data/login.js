import * as firebase from '../configs/firebase'
import messages from '../configs/messages'
import encrypt from '../crosscutting/encrypt'

class loginData
{
    login(email,passwordPlain)
    {
        return new Promise( (resolve, reject) => {
            if(firebase.db === undefined)
                reject( new Error(messages.errServerDataIsUnavailable));

            let userRef = firebase.db.collection( firebase.tables.users );
            let query = userRef.where('email','==',email );

            query.get().then( (snapshot) => {  

                let result;
                if(snapshot.empty || snapshot.size >1) 
                    {  reject(messages.errNotUserFoundByEmail);  }

                snapshot.forEach((doc) => {           
                    result = this.mappingFromStorageToUserModel(doc.id, doc.data());
                });

                encrypt.comparePassword(passwordPlain,result.password)
                        .then( (canIlogin) => resolve(canIlogin))
                        .catch( (err) =>  reject(err)  );
            }).catch( (err) => { reject(err); } );
            
        });
    }


}

export default loginData;
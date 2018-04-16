import * as firebase from '../configs/firebase';
import userModel from '../models/user';

class userLogic
{

    mappingToUserModel(id,user)
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

            let userRef = firebase.db.collection( firebase.tables.users );
            let query = userRef.orderBy('surname').startAt(pageSize * (pageNum-1) ).limit(pageSize);

            query.get().then( (snapshot) => {  

                let result = [];
                if(snapshot.empty) return result;

                snapshot.forEach((doc) => {           
                    result.push(this.mappingToUserModel(doc.id, doc.data()));
                });
                resolve(result);
            }).catch( (err) => { reject(err); } );
        });
    }
}

export default userLogic;
import * as firebase from '../configs/firebase';
import userModel from '../models/user';

class userLogic
{
    getAllUsers(pageSize,pageNum)
    {

        return new Promise( (resolve, reject) => {

            let userRef = firebase.db.collection( firebase.tables.users );
            let query = userRef.orderBy('surname').startAt(pageSize * (pageNum-1) ).limit(pageSize);

            query.get().then( (snapshot) => {  

                let result = [];
                if(snapshot.empty) return result;
                snapshot.forEach((doc) => {
                   
                    let aux =doc.data();
                    let use = new userModel();
                    
                    use.Id = doc.id;
                    use.Email = aux.email;
                    use.Name = aux.name;
                    use.Surname = aux.surname;

                    result.push(use);
                });
                resolve(result);
            }).catch( (err) => { reject(err); } );
        });
    }
}

export default userLogic;
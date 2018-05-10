import {messages} from 'apis-core'; 

let myMessages = {  
    errNoUserExistWithId:'no user exist with id'
};

const result = Object.assign({}, messages, myMessages);

export default result;

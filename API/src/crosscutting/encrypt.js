import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

if(process.env.PASSWORD_SALT === undefined )//or else env variable is not defined
  dotenv.config()

exports.cryptPassword = (password) =>{ 
    
    return new Promise( (resolve, reject) =>{
        bcrypt.genSalt( parseInt(process.env.PASSWORD_SALT) , (err, salt) => {
            if (err) reject(err)
            bcrypt.hash(password, salt, (err, hash)=> { resolve(hash);  })
        });
    });
}

exports.comparePassword = (password, hash) =>{ 
        return new Promise((resolve, reject ) =>{
            bcrypt.compare(password, hash, (err, isPasswordMatch) => {   
                return err === undefined ? resolve( isPasswordMatch) :  reject(err)
            });
        });
}

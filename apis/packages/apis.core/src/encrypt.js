import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

if(process.env.PASSWORD_SALT === undefined )//or else env variable is not defined
{
    const aux = __dirname+'/../../.env/production.env'
    dotenv.config({ path: aux })
}

exports.cryptPassword = (password) =>{ 
    
    return new Promise( (resolve, reject) =>{
        bcrypt.genSalt( parseInt(process.env.PASSWORD_SALT) , (err, salt) => {
            if (err) reject(err)
            bcrypt.hash(password, salt, (err, hash)=> { resolve(hash)  })
        });
    });
}

exports.comparePassword = (password, hash) =>{ 
        return new Promise((resolve, reject ) =>{
            bcrypt.compare(password, hash, (err, isPasswordMatch) => {
                return err === undefined ? resolve(isPasswordMatch) : reject(err)
            });
        });
}

exports.createJWTtoken = (data) =>{
    return jwt.sign(data, process.env.PASSWORD_JWT, { expiresIn: '1h' })
}

exports.verifyJWTtokenAsync = (token) =>{
    return new Promise((resolve, reject ) =>{
        jwt.verify(token,process.env.PASSWORD_JWT, (err, decoded) => {
            err === null ? resolve(true) : resolve(false) //reject(err)
        });
    });
}

exports.verifyJWTtoken = (token) =>{
    return jwt.verify(token,process.env.PASSWORD_JWT); 
}
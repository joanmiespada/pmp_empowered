import dotenv from 'dotenv';
import * as admin from 'firebase-admin';

dotenv.config();
let private_key_cert = process.env.FIREBASE_PRIVATE_KEY_CERT.replace(/\\n/g, '\n');

let config ={
    "type": "service_account",
    "project_id": "pmp-empowered",
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": private_key_cert,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ja8r7%40pmp-empowered.iam.gserviceaccount.com"
  }

 
admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: 'https://pmp-empowered.firebaseio.com'
});



let db = admin.firestore();
let tables = { users:'users' } //add all collections here! 

export { db, tables};



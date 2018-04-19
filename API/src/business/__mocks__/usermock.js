import fs from 'fs';

const request = () => new Promise((resolve, reject) => {
   
    fs.readFile(`../../models/__mockData__/user.json`, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve({entities: JSON.parse(data)});
    });
  });
  
  export default request;
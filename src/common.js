const {ApiControlsDB} = require('./../dbConfigs')
const crypto = require('crypto-js')

async function userVerify(Token){
    const res = await new Promise((resolve, reject) => {
        ApiControlsDB().query(`select * from tbl_apiTokens where Token_Key = '${Token}'`, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
    return res;
}

function security(data,key,enable=0){
    if(enable == 1){
        return crypto.AES.decrypt(data,key)
    }
}

async function createConnectionForClient(Token){
    let data = await userVerify(Token)
    return (data && data.length > 0) ? data : 'Please Verify Token or Contact Administartor'
}

module.exports = {userVerify,security,createConnectionForClient}
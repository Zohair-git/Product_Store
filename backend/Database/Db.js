const mongoose = require('mongoose');

async function DbConnnection() {
    const connection = await mongoose.connect(process.env.DB)
    if(connection){
        console.log("DB connection success")
    }
}
module.exports={DbConnnection}
const mongoose = require('mongoose');
const mongodb = async () => {
    try {
        await mongoose.connect(process.env.URL).then(() => {
            console.log("mongodb is connect.....");
        }).catch((err) => {
            console.log('err :>> ', err);
        })
    } catch (error) {
        console.log('error :>> ', error);
    }
}
module.exports = mongodb
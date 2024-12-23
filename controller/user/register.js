const userModel = require('../../models/userSchema')
const Response = require("../../helper/errHandel")
var CryptoJS = require("crypto-js");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const getData = await userModel.findOne({ email: email });
        if (getData) {
            const obj = {
                res,
                status: 402,
                messages: "this data is already register"
            }
            return Response.Error(obj);
        }
        if (!name) {
            const obj = {
                res,
                status: 401,
                messages: "pleash fill name"
            }
            return Response.Error(obj);
        }
        if (!email) {
            const obj = {
                res,
                status: 401,
                messages: "pleash fill email"
            }
            return Response.Error(obj);
        }
        if (!password) {
            const obj = {
                res,
                status: 401,
                messages: "pleash fill password"
            }
            return Response.Error(obj);
        }
        var encrypt = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
        req.body.password = encrypt

        const saveData = await userModel.create(req.body);
        const obj = {
            res,
            status: 200,
            messages: 'save userdata',
            data: saveData
        }
        return Response.success(obj);
    } catch (error) {
        const obj = {
            res,
            status: 500,
            messages: error.stack
        }
        return Response.Error(obj);
    }


}
module.exports = register
const Response = require("../../helper/errHandel");
const userSchema = require("../../models/userSchema");
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const getData = await userSchema.findOne({ email: email }).select('+password');
        if (!getData) {
            const obj = {
                res,
                status: 401,
                messages: "pleash register your email id for admin",
            }
            return Response.Error(obj);
        }
            if (getData.role !== "admin") {
            const obj = {
                res,
                status: 401,
                messages: "Permission decline , you are not user"
            }
            return Response.Error(obj);
        }
        var bytes = CryptoJS.AES.decrypt(getData.password, process.env.SECRET_KEY);
        var decrypt = bytes.toString(CryptoJS.enc.Utf8);
        getData.password = undefined
        if (password == decrypt) {
            const encrypt = CryptoJS.AES.encrypt(getData.id.toString(), process.env.ADMIN_KEY).toString();
            const token = jwt.sign({
                userId: encrypt,
                role: getData.role
            }, process.env.JWT, { expiresIn: '1h' });
            const obj = {
                res,
                status: 200,
                messages: "login  successFully",
                data: [getData, { accebylity: token }]
            }
            return Response.success(obj);
        }
        else {
            const obj = {
                res,
                status: 402,
                messages: "miss matech password"
            }
            return Response.Error(obj);
        }
    } catch (error) {
        const obj = {
            res,
            status: 500,
            messages: error.stack
        }
        return Response.Error(obj);
    }
}
module.exports = login
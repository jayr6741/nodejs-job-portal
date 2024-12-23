var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
const Response = require("../helper/errHandel");
const userAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        const checkToken = token.split(' ')[0];
        if (checkToken !== 'Bearer') {
            const obj = {
                res,
                status: 401,
                messages: "pleash cheack token"
            }
            return Response.Error(obj);
        }
        token = token.split(' ')[1]

        jwt.verify(token, process.env.JWT, function (err, decoded) {
            if (err) {
                const obj = {
                    res,
                    status: 402,
                    messages: err
                }
                return Response.Error(obj);
            }
            else {
                var bytes = CryptoJS.AES.decrypt(decoded.userId, process.env.USER_KEY);
                var decrypt = bytes.toString(CryptoJS.enc.Utf8);
                req.userId = decrypt
                req.role = decoded.role
            }
            next();
        });
    } catch (error) {
        const obj = {
            res,
            status: 500,
            messages: error.stack
        }
        return Response.Error(obj);
    }
}
module.exports = userAuth
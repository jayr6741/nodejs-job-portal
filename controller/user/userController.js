const Response = require("../../helper/errHandel");
const userSchema = require("../../models/userSchema");


//======= update user=======
const updateuser = async (req, res) => {
    try {
        const updatedata = req.body
        delete updatedata.password
        const getData = await userSchema.findOneAndUpdate({ _id: req.userId }, req.body, { new: true });
        if (!getData) {
            const obj = {
                res,
                status: 401,
                messages: 'pleash register your data'
            }
            return Response.Error(obj);
        }
        const obj = {
            res,
            status: 200,
            messages: "user data update successFully",
            data: getData
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
module.exports = updateuser
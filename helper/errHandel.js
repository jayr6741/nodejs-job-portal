const Response = {
    success: ({ res, status, messages,totaljob, data }) => {
        return res.status(status).json({
            messages: messages,
            // totaljob:totaljob,
            data: data
        })
    },
    Error: ({ res, status, messages, errro }) => {
        return res.status(status).json({
            messages: messages,
            // totaljob:totaljob,
            errro: errro
        })
    }
}
module.exports=Response
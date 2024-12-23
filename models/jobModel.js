const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const jobschema = new Schema({
    company: {
        type: String,
        require: [true, 'company name is required']
    },
    position: {
        type: String,
        maxength: 100,
        require: [true, 'position  is required']
    },
    status: {
        type: String,
        enum: ['pendding,reject,interview'],
        default: 'pendding'
    },
    worktype: {
        type: String,
        enum: ['full-time', 'part-time'],
        default: 'full-time'
    },
    worklocation: {
        type: String,
        default: 'surat',
        require: [true, 'work location is required']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
    }
}, { timestamps: true })
module.exports = model("jobschema", jobschema);
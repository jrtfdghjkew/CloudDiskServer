const  {Schema, model,ObjectId} = require("mongoose")

const User = new Schema({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3},
    usedSpace: {type: Number, default: 0},
    avatar : {type: String},
    files : [{type: ObjectId, ref: 'File'}]
},{
    versionKey: false
})

module.exports = model('User', User)
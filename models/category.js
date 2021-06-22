import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        maxLength : 32
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    
}, {timestamps : true} )
module.exports = mongoose.model("Category" , categorySchema);
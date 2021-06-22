import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxLength: 100
    },
    photo: {
        // data : Buffer,
        // contentType : String
        type : String
    },
    content : {
        trim: true,
        type : String,
        maxLength : 2000
    }

} , {timestamps : true } 
)
module.exports = mongoose.model('Blog' , blogSchema);
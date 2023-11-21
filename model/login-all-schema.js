

const mongoose = require("mongoose") ;

let schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass:{
        type:String,
        required: true,
    },
    phon: {
        type: String,
        required: true,
    },
    hasS: { 
        type: Boolean,
        default: false
    },
    profile: { 
        type: String,
        default: 'user'
    }

})
const userVal = mongoose.model("user",schema)
module.exports=userVal;
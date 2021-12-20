const mongoose = require("mongoose")
const user = new mongoose.Schema({
    email:{ type : String ,required : true , unique : true},
    password : { type : String , required : true , unique : true},
    username : {type : String , required : true},
    img : { type: String},
    isdel : {type: Boolean},
    role : {
        type :mongoose.Schema.Types.ObjectId , 
        ref : "Role",
        default :"d"
    },
    state :{ type : Boolean , default : false
    },
    activeCode : {type : String},
    passwordCode : {type : String}
})
module.exports = mongoose.model("User" , user)
const moongose = require("mongoose");

const sch = new moongose.Schema({
    name:{

        type:String,
        required :true
    }
})

const teams = moongose.model("team",sch);

module.exports = teams;
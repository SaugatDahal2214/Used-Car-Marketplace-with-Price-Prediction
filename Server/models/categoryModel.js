const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true,
        index:true,
    },
},{
    timestamps:true
})

module.exports= mongoose.model("Category", categorySchema)
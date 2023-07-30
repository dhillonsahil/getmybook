const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true },
},{timestamps:true})

export default mongoose.models.Admin || mongoose.model("Admin",AdminSchema)
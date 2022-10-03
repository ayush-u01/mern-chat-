const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    pic:{ type: String , default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",},
},{timestamps: true})

userSchema.methods.matchPass = async function (enteredpass){
    return await bcrypt.compare(enteredpass, this.password);
}


userSchema.pre('save', async function (next) { // userSchema.pre('save', asyn function (next)) - pre suggest that we have to run this before saving,   // its taking next because its middle ware
    if(!this.isModified) next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);

module.exports = User;

// username
// email 

// password
// picture

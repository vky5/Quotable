import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from "validator";


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Enter a name']
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, 'Please enter an email']
    },
    password: {
        type: String,
        minlength: 8, 
        required: true, 
        select: false 
    },
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function(next){
    // Hash password only if modified or new user
    if (!this.isModified('password') || !this.isNew) return next();

    // Hash the password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});


userSchema.methods.correctPassword = async function(password, actualPassword){
    return await bcrypt.compare(password, actualPassword);
}

const UserModel = mongoose.model('UserModel', userSchema);
export default UserModel;

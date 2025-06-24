import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";



export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    role: "user" | "admin",
    avatar?: string,
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', "admin"],
        default: "user"
    },
    avatar: {
        type: String,
    }
}, { timestamps: true })



UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


UserSchema.methods.comparePassword = async function (candidatePassword: string):
    Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password)
}


const User = mongoose.model<IUser>('User', UserSchema);
export default User;
import mongoose, {DateUnit, Document} from "mongoose";



export interface IRefreshTokenSchema extends Document{
    user:mongoose.Schema.Types.ObjectId,
    token:String,
    expiresAt:Date,
    createdAt:Date
}


const refreshTokenSchema = new mongoose.Schema<IRefreshTokenSchema>({
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    token:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const RefreshToken = mongoose.model<IRefreshTokenSchema>('RefreshToken', refreshTokenSchema);


export default RefreshToken;
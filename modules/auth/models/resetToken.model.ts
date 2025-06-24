import mongoose, {DateUnit, Document} from "mongoose";



export interface IResetTokenSchema extends Document{
    user:mongoose.Schema.Types.ObjectId,
    token:String,
    expiresAt:Date,
    createdAt:Date
}


const resetTokenSchema = new mongoose.Schema<IResetTokenSchema>({
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

const ResetToken = mongoose.model<IResetTokenSchema>('ResetToken', resetTokenSchema);


export default ResetToken;
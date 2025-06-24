import User from "../auth/models/user.model";
import { successResponse, errorResponse } from "../../utils/response";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";


export const updateMe = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = (req as any).user.userId;
        const { username, email, password } = req.body;
        const updateData: Partial<Record<string, any>> = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) updateData.password = password;
        if (req.file) {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            updateData.avatar = `${baseUrl}/uploads/${req.file.filename}`;
        }
        delete (req.body as any).role;
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');

        if (!updatedUser) {
            return errorResponse(res, 'User not found', 404);
        }

        return successResponse(res, updatedUser, 'User updated with avatar');
    } catch (err: any) {
        return errorResponse(res, 'Failed to update profile');
    }
}
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = (req as any).user?.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) return errorResponse(res, "Invalid user")

        const user = await User.findById(userId).select('-password');
        if (!user) return errorResponse(res, "user Not Found", 404);

        return successResponse(res, user, 'User profile retrieved')
    } catch (err: any) {
        return errorResponse(res, "Failed to get profile")
    }
}
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const users = await User.find().select('-password');
        return successResponse(res, users, 'Users retrieved successfully');

    } catch (err: any) {
        return errorResponse(res, 'Failed to get users')
    }
}


export const deleteUser = async (req:Request, res:Response, next:NextFunction
):Promise<any> => {
    try{
        const userId = (req as any).params.userId;
        if(!mongoose.Types.ObjectId.isValid(userId)) return errorResponse(res, "Invalid user id");
        
        const deleteUser = await User.findOneAndDelete({_id:userId});
        if(!deleteUser){
            return errorResponse(res, 'User not found');
        }

        return successResponse(res, {}, 'User deleted successfully');

    }catch(err:any){
        return errorResponse(res, 'Failed to delete user')
    }
}


export const updateUserRole = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (!['admin', 'user'].includes(role)) {
      return errorResponse(res, 'Invalid role provided', 400);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    return successResponse(res, user, 'User role updated successfully');
  } catch (err) {
    return errorResponse(res, 'Failed to update user role');
  }
};

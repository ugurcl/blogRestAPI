import { Request, Response, NextFunction } from "express";
import * as authService from "../auth.service";
import { successResponse, errorResponse } from "../../../utils/response";
import User from "../models/user.model";
import RefreshToken from "../models/refreshToken.model";
import { generateRefreshToken } from "../auth.service";
import {generateResetToken} from "../../../utils/resetToken"
import ResetToken from "../../auth/models/resetToken.model"
import {sendEmail} from "../../../utils/sendEmail"
import bcrypt from "bcryptjs";
import crypto from "crypto";


export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.registerUser(
      username,
      email,
      password
    );

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: "user",
        },
        accessToken,
        refreshToken,
      },
      "User registered successfully",
      201
    );
  } catch (err: any) {
    return errorResponse(res, err?.message || "Registration failed", 400);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(
      email,
      password
    );

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
      "Login successful",
      200
    );
  } catch (err: any) {
    return errorResponse(res, err.message || "Login failed", 401);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return errorResponse(res, "Refresh token is required", 400);
    }

    const { userId, role } = await authService.verifyRefreshToken(refreshToken);
    const newAccessToken = authService.generateToken(userId, role);

    return successResponse(
      res,
      {
        accessToken: newAccessToken,
      },
      "Access token refreshed",
      200
    );
  } catch (err: any) {
    return errorResponse(res, err.message || "Failed to refresh token", 401);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return errorResponse(res, "Refresh token is required", 400);
    }

    await authService.revokeRefreshToken(refreshToken);

    return successResponse(res, {}, "Logged out successfully", 200);
  } catch (err: any) {
    return errorResponse(res, err.message || "Logout failed", 500);
  }
};



export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return errorResponse(res, 'A valid email is required', 400);
  }

  const user = await User.findOne({ email });
  if (!user) return errorResponse(res, 'User not found', 404);

  const { token, hash } = generateResetToken();

  
  await ResetToken.deleteMany({ user: user._id });

  await ResetToken.create({
    user: user._id,
    token: hash,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
  });

   const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const html = `
    <h3>Şifre Sıfırlama Talebi</h3>
    <p>Aşağıdaki linkten şifrenizi sıfırlayabilirsiniz:</p>
    <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    <p>Bu bağlantı 10 dakika içinde geçerliliğini yitirir.</p>
  `;

  await sendEmail(email, 'Şifre Sıfırlama Bağlantısı', html);

  return successResponse(res, {}, 'Reset password link sent to your email');
};



export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || typeof token !== 'string' || !newPassword) {
    return errorResponse(res, 'Token and new password are required', 400);
  }

  const hashed = crypto.createHash('sha256').update(token).digest('hex');

  const resetRecord = await ResetToken.findOne({
    token: hashed,
    expiresAt: { $gt: new Date() }
  });

  if (!resetRecord) {
    return errorResponse(res, 'Invalid or expired reset token', 400);
  }

  const user = await User.findById(resetRecord.user);
  if (!user) return errorResponse(res, 'User not found', 404);

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();


  await ResetToken.deleteMany({ user: user._id });

  return successResponse(res, {}, 'Password reset successfully');
};
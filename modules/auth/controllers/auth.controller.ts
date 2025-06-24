import {Request, Response, NextFunction} from "express";
import * as authService from "../auth.service";
import {successResponse, errorResponse} from "../../../utils/response";


export const register = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { username, email, password } = req.body;
    
    const { user, accessToken, refreshToken } = await authService.registerUser(username, email, password);

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        accessToken,
        refreshToken
      },
      'User registered successfully',
      201
    );

  } catch (err:any) {
    return errorResponse(res, err?.message || 'Registration failed', 400);
  }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    return successResponse(res, {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    }, 'Login successful', 200);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Login failed', 401);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return errorResponse(res, 'Refresh token is required', 400);
    }

    const { userId, role } = await authService.verifyRefreshToken(refreshToken);
    const newAccessToken = authService.generateToken(userId, role);

    return successResponse(res, {
      accessToken: newAccessToken
    }, 'Access token refreshed', 200);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to refresh token', 401);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return errorResponse(res, 'Refresh token is required', 400);
    }

    await authService.revokeRefreshToken(refreshToken);

    return successResponse(res, {}, 'Logged out successfully', 200);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Logout failed', 500);
  }
};
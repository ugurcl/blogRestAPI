import User from "./models/user.model";
import RefreshToken from "./models/refreshToken.model";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!;
const REFRESH_TOKEN_EXPIRES_DAYS = 30;

export interface JwtPayload {
    userId: string,
    role: 'admin' | 'user'
}

export const generateToken = (userId: string, role: 'admin' | 'user'): string => {
    const payload = { userId, role }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any })
}

export const generateRefreshToken = async (userId: string) => {
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000);

    const tokenDoc = await RefreshToken.create({
        user: userId,
        token: refreshToken,
        expiresAt
    })

    return refreshToken;

}

export const verifyRefreshToken = async (token: string) => {
    const tokenDoc = await RefreshToken.findOne({ token });
    if (!tokenDoc) throw new Error('Invalid refresh token ');
    if (tokenDoc.expiresAt < new Date()) {
        await tokenDoc.deleteOne();
        throw new Error('Refresh token expired');
    };

    const user = tokenDoc.user as any;
    return {
        userId: user._id.toString(),
        role: user.role
    };
}


export const revokeRefreshToken = async (token: string) => {
    await RefreshToken.deleteOne({ token });
};


export const registerUser = async (username: string, email: string, password: string) => {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) throw new Error('Email already registered');

    const existingUsername = await User.findOne({username});
    if(existingUsername) throw new Error('Username already registered');

    
    const user = new User({ username, email, password });
    await user.save();

    const accessToken = generateToken(
        user._id as string,
        user.role
    );
    const refreshToken = await generateRefreshToken(user._id as string);

    return { user, accessToken, refreshToken };
};


export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');

    const accessToken = generateToken(user._id as string, user.role);
    const refreshToken = await generateRefreshToken(user._id as string);

    return { user, accessToken, refreshToken };
};
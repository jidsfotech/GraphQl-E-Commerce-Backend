import { Schema, model } from 'mongoose';
import { config } from "../../config/config";
import { IUser, IUserMethods, UserModel } from './user.type';
import bcrypt from 'bcrypt';

export const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    email: {
        type: String, required: [true, 'please provide a valid email address'], index: { unique: true }
    },
    password: { type: String, required: true },
    name: { type: String },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number }
});


const user = '';
UserSchema.pre<IUser>('save', async function (next: any) {
    const user = this;
    const salt_work_factor = config.bcrypt_salt;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(Number(salt_work_factor));
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.virtual('isLocked').get(function (): boolean {
    return !!(this.lockUntil && this.lockUntil > Date.now());
})

UserSchema.method('comparePassword', async function (password: string, cb: any) {
    await bcrypt.compare(password, this.password, function (error, isMatch) {
        if (error) {
            throw error;
        }
        cb(null, isMatch);
    });
})

export const User = model<IUser, UserModel>('User', UserSchema);
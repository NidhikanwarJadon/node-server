import { Types } from "mongoose";
import { IUser, User } from "./user.model";
import bcrypt from "bcryptjs";

export const createUserRepo = async (data: IUser) => {
	const hashPassword = await bcrypt.hash(data.password, 10);

	const user = await User.create({
		...data,
		password: hashPassword,
	});

	return user;
};

export const findUserByEmail = async (email: string) => {
	return await User.findOne({ email });
};

export const getAllUsersRepo = async () => {
	return await User.find();
};

export const getUserByIdRepo = async (id: Types.ObjectId) => {
	const user = await User.findById(id);
	if (!user) {
		throw new Error("User not found");
	}
	return user;
};

export const updateUserRepo = async (id: any, data: any) => {
	return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUserRepo = async (id: any) => {
	return await User.findByIdAndDelete(id);
};

export const findUserByResetToken = async (hashedToken: string) => {
	return await User.findOne({
		resetPasswordToken: hashedToken,
		resetPasswordExpire: { $gt: Date.now() },
	});
};

export const findUsersWithPagination = async (skip: number, limit: number) => {
	return await User.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
};

export const countUsers = async () => {
	return await User.countDocuments();
};

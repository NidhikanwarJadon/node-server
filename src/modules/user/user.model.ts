import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber?: string;
	address?: string;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: false },
		email: { type: String, required: true },
		password: { type: String, required: true },
		phoneNumber: { type: String, required: false },
		address: { type: String, required: false },
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model<IUser>("User", userSchema);

export const model = User;
export { User, userSchema };

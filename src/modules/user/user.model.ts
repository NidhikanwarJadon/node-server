import mongoose, { Schema } from "mongoose";

export type UserRole =
	| "ADMIN"
	| "PCP"
	| "GCS"
	| "PRIMARY_OBSERVER"
	| "INDEPENDENT_CAREGIVER";

export interface IUser extends Document {
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
	phoneNumber?: string;
	address?: string;
	role: UserRole;
	active?: boolean;
	createdAt: Date;
	updatedAt: Date;
	resetPasswordToken?: string;
	resetPasswordExpire?: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: false },
		email: { type: String, required: true },
		password: { type: String, required: true },
		phoneNumber: { type: String, required: false },
		address: { type: String, required: false },
		role: {
			type: String,
			required: true,
			enum: [
				"ADMIN",
				"PCP",
				"GCS",
				"PRIMARY_OBSERVER",
				"INDEPENDENT_CAREGIVER",
			],
			default: "ADMIN",
		},
		active: { type: Boolean, default: true },
		resetPasswordToken: {
			type: String,
		},
		resetPasswordExpire: {
			type: Date,
		},
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model<IUser>("User", userSchema);

export const model = User;
export { User, userSchema };

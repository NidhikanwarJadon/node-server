import mongoose, { Document, model, Schema } from "mongoose";

export interface IOrganization extends Document {
	name: string;
	email: string;
	phone: string;
	address?: string;
	active?: boolean;
}

const organizationSchema: Schema<IOrganization> = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		phone: { type: String, required: false },
		address: { type: String, required: false },
		active: { type: Boolean, required: false, default: true },
	},
	{ timestamps: true },
);

export const Organization = model<IOrganization>(
	"Organization",
	organizationSchema,
);

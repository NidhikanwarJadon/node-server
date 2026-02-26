import mongoose, { Document, model, Schema, Types } from "mongoose";

export interface IClient extends Document {
	organization: Types.ObjectId;
	associateUsers?: Types.ObjectId[];
	requirementUploads?: Types.ObjectId[];
}

const clientSchema: Schema<IClient> = new mongoose.Schema(
	{
		organization: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Organization",
		},
		associateUsers: [
			{ type: Schema.Types.ObjectId, required: false, ref: "User" },
		],
		requirementUploads: [
			{
				type: Schema.Types.ObjectId,
				required: false,
				ref: "ClientRequirementUpload",
			},
		],
	},
	{
		timestamps: true,
	},
);

export const Client = model<IClient>("Client", clientSchema);

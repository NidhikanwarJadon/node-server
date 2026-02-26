import mongoose, { Document, model, Schema, Types } from "mongoose";

export type FileStatus = "UPLOADED" | "APPROVED" | "REJECTED";
export interface IClientRequirementUpload extends Document {
	client: Types.ObjectId;
	fileName: string;
	fileUrl: string;
	uploadedBy: Types.ObjectId;
	status: FileStatus;
}

const clientRequirementUploadSchema: Schema<IClientRequirementUpload> =
	new mongoose.Schema(
		{
			client: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
			fileName: { type: String, required: true },
			fileUrl: { type: String, required: true },
			uploadedBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
			status: {
				type: String,
				enum: ["UPLOADED", "APPROVED", "REJECTED"],
				default: "UPLOADED",
				required: true,
			},
		},
		{
			timestamps: true,
		},
	);

export const ClientRequirementUpload = model<IClientRequirementUpload>(
	"ClientRequirementUpload",
	clientRequirementUploadSchema,
);

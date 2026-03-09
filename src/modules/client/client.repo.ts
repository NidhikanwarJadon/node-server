import { Types } from "mongoose";
import { Client, IClient } from "./client.model";

export const createClientRepo = async (clientData: Partial<IClient>) => {
	return await Client.create(clientData);
};

export const findClientsWithPagination = async (
	skip: number,
	limit: number,
) => {
	return Client.find()
		.populate("organization", "name email phone address active")
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);
};

export const countClients = async () => {
	return Client.countDocuments();
};

export const updateClientRepo = async (
	id: string,
	clientData: Partial<IClient>,
) => {
	return Client.findByIdAndUpdate(id, clientData, { new: true });
};

export const findClientById = async (id: string) => {
	return Client.findById(id);
};

export const addAssociateUser = async (
	clientId: string,
	userId: Types.ObjectId,
) => {
	return Client.findByIdAndUpdate(
		clientId,
		{ $push: { associateUsers: userId } },
		{ new: true },
	);
};

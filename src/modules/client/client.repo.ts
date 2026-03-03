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

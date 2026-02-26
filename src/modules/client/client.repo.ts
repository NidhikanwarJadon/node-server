import { Client, IClient } from "./client.model";

export const createClientRepo = async (clientData: Partial<IClient>) => {
	return await Client.create(clientData);
};
  
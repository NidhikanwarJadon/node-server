import { IOrganization } from "../organization/organization.model";
import {
	createOrganizationRepo,
	findActiveOrganizationByEmail,
	findActiveOrganizationByName,
} from "../organization/organization.repo";
import { createClientRepo } from "./client.repo";

export const createClientService = async (data: Partial<IOrganization>) => {
	const { name, email } = data;

	if (!name || !email) {
		throw new Error("Name and email are required to create a client");
	}

	// Check active email
	const existingByEmail = await findActiveOrganizationByEmail(email);
	if (existingByEmail) {
		throw new Error("Active client with this email already exists");
	}

	// Check active name
	const existingByName = await findActiveOrganizationByName(name);
	if (existingByName) {
		throw new Error("Active client with this name already exists");
	}

	const organization = await createOrganizationRepo(data);

	return await createClientRepo({ organization: organization._id });
};

import { IOrganization } from "./organization.model";
import * as organizationRepo from "./organization.repo";

export const createOrganizationService = async (
	organization: Partial<IOrganization>,
) => {
	const { email } = organization;
	if (!email) {
		throw new Error("Email is required to create an organization.");
	}
	const existingOrg = await organizationRepo.findOrganizationByEmail(email);

	if (existingOrg) {
		throw new Error("Organization already exists.");
	}

	return organizationRepo.createOrganizationRepo(organization);
};

export const getAllOrganizationService = async () => {
	return organizationRepo.getAllOrganizations();
};

export const updateOrganizationService = async (
	id: string,
	updatedData: Partial<IOrganization>,
) => {
	const { email } = updatedData;

	if (email) {
		throw new Error("Email can not be updated");
	}
	const orgById = await organizationRepo.findOrganizationById(id);

	if (!orgById) {
		throw new Error("Organization does not exist");
	}

	return organizationRepo.updateOrganization(id, updatedData);
};

export const deleteOrganizationService = async (id: string) => {
	const orgById = await organizationRepo.findOrganizationById(id);
	if (!orgById) {
		throw new Error("Organization not exist");
	}

	return organizationRepo.deleteOrganization(id);
};

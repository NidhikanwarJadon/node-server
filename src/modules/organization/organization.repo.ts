import { IOrganization, Organization } from "./organization.model";

export const createOrganizationRepo = async (data: Partial<IOrganization>) => {
	const organization = await Organization.create(data);

	return organization;
};

export const findOrganizationById = async (id: string) => {
	const organization = await Organization.findById(id).lean();
	if (!organization) {
		throw new Error("Organization not found");
	}

	return organization;
};

export const findActiveOrganizationByEmail = async (email: string) => {
	return await Organization.findOne({ email, active: true });
};

export const findActiveOrganizationByName = async (name: string) => {
	return await Organization.findOne({ name, active: true });
};

export const getAllOrganizations = async () => {
	return await Organization.find();
};

export const updateOrganization = async (
	id: string,
	data: Partial<IOrganization>,
) => {
	return await Organization.findByIdAndUpdate(id, data, { new: true });
};

export const deleteOrganization = async (id: string) => {
	return await Organization.findByIdAndDelete(id);
};

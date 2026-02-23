import * as userRepo from "./user.repo";
import bcrypt from "bcryptjs";
export const createUserService = async (data: any) => {
	const existingUser = await userRepo.findUserByEmail(data.email);

	if (existingUser) {
		throw new Error("User already exists");
	}

	return await userRepo.createUserRepo(data);
};

export const getAllUsersService = async () => {
	return await userRepo.getAllUsersRepo();
};

export const getUserByIdService = async (id: any) => {
	return await userRepo.getUserByIdRepo(id);
};

export const updateUserService = async (id: any, data: any) => {
	const user = await userRepo.getUserByIdRepo(id);
	if (!user) {
		throw new Error("User not found");
	}
	if (data.password) {
		const hashPassword = await bcrypt.hash(data.password, 10);
		data.password = hashPassword;
	}
	return await userRepo.updateUserRepo(id, data);
};

export const deleteUserService = async (id: any) => {
	const user = await userRepo.getUserByIdRepo(id);
	if (!user) {
		throw new Error("User not found");
	}
	return await userRepo.deleteUserRepo(id);
};

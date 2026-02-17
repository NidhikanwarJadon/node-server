import { Request, Response } from "express";
import * as userService from "./user.service";

export const createUser = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password, phoneNumber, address } =
			req.body;

		const user = await userService.createUserService({
			firstName,
			lastName,
			email,
			password,
			phoneNumber,
			address,
		});
		res.status(200).json({ user, message: "User created successfully" });
	} catch (error: any) {
		res.status(500).json({ error: error.message || "Error creating user" });
	}
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await userService.getAllUsersService();
		res
			.status(200)
			.json({ data: users, message: "Users fetched successfully" });
	} catch (err: any) {
		res.status(500).json({ error: err.message || "Error fetching users" });
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await userService.getUserByIdService(id as string);
		res.status(200).json({ data: user, message: "User fetched successfully" });
	} catch (err: any) {
		res.status(500).json({ error: err.message || "Error fetching user" });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updatedUser = await userService.updateUserService(
			id as string,
			req.body,
		);
		res
			.status(200)
			.json({ data: updatedUser, message: "User updated successfully" });
	} catch (err: any) {
		res.status(500).json({ error: err.message || "Error updating user" });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await userService.deleteUserService(id as string);
		res.status(200).json({ message: "User deleted successfully" });
	} catch (err: any) {
		res.status(500).json({ error: err.message || "Error deleting user" });
	}
};

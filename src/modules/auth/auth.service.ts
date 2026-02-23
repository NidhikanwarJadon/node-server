import { findUserByEmail } from "../user/user.repo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async (email: string, password: string) => {
	const user = await findUserByEmail(email);

	if (!user) {
		throw new Error("User not found");
	}

	const validatePassword = await bcrypt.compare(password, user.password);
	if (!validatePassword) {
		throw new Error("Invalid Password");
	}
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT secret is not defined");
	}

	const token = jwt.sign(
		{
			id: user._id,
			email: user.email,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "1h" },
	);
	return { token, user };
};

import { findUserByEmail, findUserByResetToken } from "../user/user.repo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../../services/emailService";

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

export const forgotPasswordService = async (email: string) => {
	const user = await findUserByEmail(email);

	if (!user) {
		throw new Error("User not found");
	}

	// Generate raw reset token
	const resetToken = crypto.randomBytes(32).toString("hex");

	// Hash token before saving
	const hashedToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// Save hashed token + expiry
	user.resetPasswordToken = hashedToken;
	user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);

	await user.save();
	const RESET_PASSWORD_EXPIRE = 15 * 60 * 1000;
	const minutes = RESET_PASSWORD_EXPIRE / (60 * 1000);
	const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

	await sendEmail(user.email, "Password Reset Request", "forgotPassword", {
		name: user.firstName,
		resetLink: resetLink,
		expiryTime: `${minutes} minutes`,
	});
};

export const resetPasswordService = async (
	token: string,
	newPassword: string,
) => {

	// Hash incoming token
	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

	// Find user
	const user = await findUserByResetToken(hashedToken);

	if (!user) {
		throw new Error("Token is invalid or expired");
	}

	// Hash new Password
	const hashedPassword = await bcrypt.hash(newPassword, 10);
	user.password = hashedPassword;

	// Clear reset fields
	user.resetPasswordExpire = undefined;
	user.resetPasswordToken = undefined;

	await user.save();

	return true;
};

import { Request, Response } from "express";
import {
	forgotPasswordService,
	loginService,
	resetPasswordService,
} from "./auth.service";

export const loginHandler = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const { token, user } = await loginService(email, password);

		res.cookie("access_token", token, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			path: "/",
			maxAge: 15 * 60 * 1000,
		});

		res
			.status(200)
			.json({ user, message: "User logged in successfully!", success: true });
	} catch (err: any) {
		res.status(500).json({ error: err.message || "Error while login" });
	}
};

export const forgotPasswordHandler = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		await forgotPasswordService(email);

		res.status(200).json({ message: "If email exist, reset link send!" });
	} catch (err: any) {
		res.status(400).json({ message: err.message || "Something went wrong" });
	}
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
	try {
		const { token, newPassword } = req.body;

		if (!token || !newPassword) {
			return res
				.status(400)
				.json({ message: "Token and new password are required" });
		}

		await resetPasswordService(token, newPassword);
		return res.status(200).json({ message: "Password reset successfully" });
	} catch (err: any) {
		return res
			.status(400)
			.json({ message: err.message || "Reset password failed" });
	}
};

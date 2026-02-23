import { Request, Response } from "express";
import { loginService } from "./auth.service";

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

import { NextFunction, Request, Response } from "express";
import { IUser } from "../modules/user/user.model";
import jwt from "jsonwebtoken";
import { getUserByIdRepo } from "../modules/user/user.repo";

export async function authenticateUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.cookies.access_token;

	if (!token) return res.status(401).json({ message: "No token provided" });

	try {
		let user: IUser | null = null;

		const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
		user = await getUserByIdRepo(decoded.id);

		if (!user) return res.status(401).json({ message: "User not found" });
		(req as any).user = user;
		return next();
	} catch (err: any) {
		res.status(401).json({ message: "Invalid token", authenticated: false });
	}
}

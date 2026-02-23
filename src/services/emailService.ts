import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
export const sendEmail = async (
	to: string,
	subject: string,
	templateName: string,
	variables: Record<string, string>,
) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// Read HTML file

		const templatePath = path.join(
			__dirname,
			"../templates",
			`${templateName}.html`,
		);

		let html = fs.readFileSync(templatePath, "utf-8");

		// Replace variables manually

		Object.keys(variables).forEach((key) => {
			const value = variables[key];
			html = html.replace(new RegExp(`{${key}}`, "g"), value);
		});

		// Send email
		const info = await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to,
			subject,
			html,
		});

		console.log("Email sent:", info.response);
	} catch (err: any) {
		console.error("Error sending email:", err);
		throw new Error("Email sending failed");
	}
};

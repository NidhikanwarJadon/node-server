import { Types } from "mongoose";
import { IOrganization } from "../organization/organization.model";
import * as organizationRepo from "../organization/organization.repo";
import { createUserRepo } from "../user/user.repo";
import { createUserService } from "../user/user.service";
import * as clientRepo from "./client.repo";
import * as XLSX from "xlsx";

export const createClientService = async (data: Partial<IOrganization>) => {
	const { name, email } = data;

	if (!name || !email) {
		throw new Error("Name and email are required to create a client");
	}

	// Check active email
	const existingByEmail =
		await organizationRepo.findActiveOrganizationByEmail(email);
	if (existingByEmail) {
		throw new Error("Active client with this email already exists");
	}

	// Check active name
	const existingByName =
		await organizationRepo.findActiveOrganizationByName(name);
	if (existingByName) {
		throw new Error("Active client with this name already exists");
	}

	const organization = await organizationRepo.createOrganizationRepo(data);

	return await clientRepo.createClientRepo({ organization: organization._id });
};

export const bulkCreateClientService = async (file?: Express.Multer.File) => {
	const REQUIRED_COLUMNS = ["Name", "Email", "Phone"];
	if (!file) {
		throw new Error("File not found");
	}

	const buffer = file.buffer;
	const workbook = XLSX.read(buffer, { type: "buffer" });
	const sheet = workbook.Sheets[workbook.SheetNames[0]];
	const data = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 5 });

	if (!data.length || !Array.isArray(data[0])) {
		throw new Error("Invalid file format or no header row found");
	}

	// Check if the sheet has atleast one non empty row

	const hasNonEmptyRow = data
		.slice(1)
		.some((row) =>
			(row as unknown[]).some((cell) => String(cell ?? "").trim() !== ""),
		);

	if (!hasNonEmptyRow) {
		throw new Error("No data rows found in the file");
	}

	const headers = data[0] as string[];
	const dataRows = data.slice(1);

	const failedRows: {
		row: number;
		message: string;
		column: string;
		name: string;
		email: string;
		phone: string;
	}[] = [];

	const validRows: {
		rowNum: number;
		Name: string;
		Email: string;
		Phone: string;
	}[] = [];

	const parsedEmails = new Set<string>();
	const isValidEmail = (email: string) =>
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

	for (let i = 0; i < dataRows.length; i++) {
		const rows = dataRows[i] as Record<string, string>;
		const rowErrors: typeof failedRows = [];
		const rowNum = i + 7;

		const row: Record<string, string> = {};
		headers.forEach((header, idx) => {
			row[header] = rows[idx] || "";
		});

		const isEmpty = Object.values(row).every((cell) => !cell);
		if (isEmpty) continue;

		const { Name, Email, Phone, Address } = row;

		// Check for missing required fields
		const missingFields = REQUIRED_COLUMNS.filter((col) => !row[col]);
		for (const col of missingFields) {
			rowErrors.push({
				row: rowNum,
				column: col,
				name: Name || "",
				email: Email || "",
				phone: Phone || "",
				message: `${col} is required`,
			});
		}

		// Validate email and phone format
		if (Email && !isValidEmail(Email)) {
			rowErrors.push({
				row: rowNum,
				column: "Email",
				name: Name || "",
				email: Email || "",
				phone: Phone || "",
				message: "Invalid email format",
			});
		}

		// Check duplicates inside file
		if (parsedEmails.has(Email)) {
			rowErrors.push({
				row: rowNum,
				column: "Email",
				name: Name || "",
				email: Email || "",
				phone: Phone || "",
				message: "Duplicate email found in file",
			});
		}
		parsedEmails.add(Email);

		// Check active email
		const existingByEmail =
			await organizationRepo.findActiveOrganizationByEmail(Email);

		// Check active name
		const existingByName =
			await organizationRepo.findActiveOrganizationByName(Name);

		if (existingByEmail || existingByName) {
			rowErrors.push({
				row: rowNum,
				column: existingByEmail ? "Email" : "Name",
				name: Name || "",
				email: Email || "",
				phone: Phone || "",
				message: `Active client with this ${existingByEmail ? "email" : "name"} already exists`,
			});
		}

		if (rowErrors.length) {
			failedRows.push(...rowErrors);
		} else {
			validRows.push({
				rowNum,
				Name,
				Email,
				Phone,
			});
		}
	}

	if (failedRows.length) {
		const error = new Error(`Validation failed for ${failedRows.length} rows.`);
		(error as any).cause = failedRows;
		throw error;
	}

	let addedCount = 0;

	for (const { Name, Email, Phone } of validRows) {
		await createClientService({
			name: Name,
			email: Email,
			phone: Phone,
		});
		addedCount++;
	}
};

export const getClients = async (page: number, limit: number) => {
	const skip = (page - 1) * limit;

	const [clients, total] = await Promise.all([
		clientRepo.findClientsWithPagination(skip, limit),
		await clientRepo.countClients(),
	]);

	return {
		data: clients,
		currentPage: page,
		totalPages: Math.ceil(total / limit),
		totalRecord: total,
	};
};

export const updateClientService = async (id: string, data: any) => {
	// return await clientRepo.updateClient(id, data);
};

export const createAssociateUserService = async (id: string, data: any) => {
	const client = await clientRepo.findClientById(id);

	if (!client) {
		throw new Error("Client not found");
	}
	const { name, email, phone, role } = data;
	if (!email || !role) {
		throw new Error("Email and role are required");
	}

	const password = Math.random().toString(36).slice(-8);

	const user = await createUserService({
		firstName: name,
		email,
		phoneNumber: phone,
		password,
		role,
	});

	return await clientRepo.addAssociateUser(id, user._id as Types.ObjectId);
};

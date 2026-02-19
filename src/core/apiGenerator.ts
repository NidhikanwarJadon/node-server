import { Application, Router } from "express";
import fs from "fs";
import path from "path";
import { REQUEST_TYPES } from "./requestTypes";
import { generateRequest } from "./generateRequest";
import { customApiMapper } from "./customApiMapper";

interface ApiGenerator {
	generate(app: Application): void;
	// generateApi(app: Application, name: string, model: Model<Document>): void;
}

class ApiService implements ApiGenerator {
	constructor(private modelsPath: string) {}

	public generate(app: Application) {
		const moduleFolders = fs.readdirSync(this.modelsPath);

		moduleFolders.forEach((folder) => {
			const modulePath = path.join(this.modelsPath, folder);

			// skip if not a folder
			if (!fs.statSync(modulePath).isDirectory()) return;

			const files = fs.readdirSync(modulePath);
			const modelFile = files.find((f) => f.includes(".model"));

			if (!modelFile) return;

			const { model } = require(path.join(modulePath, modelFile));
			const modelName = folder;

			const router = Router();

			if (customApiMapper[modelName]?.methods?.length) {
				customApiMapper[modelName].methods.forEach((customApi: any) => {
					if (customApi.handler) {
						customApi.handler(router, model, customApi.validator);
					}
				});

				Object.values(REQUEST_TYPES).forEach((type) => {
					const hasCustomHandler = customApiMapper[modelName].methods.some(
						(m: any) => m.type.toLowerCase() === type.toLowerCase(),
					);

					if (!hasCustomHandler) {
						generateRequest(type, router, model);
					}
				});
			} else {
				Object.values(REQUEST_TYPES).forEach((type) => {
					generateRequest(type, router, model);
				});
			}

			app.use(`/${modelName}`, router);
			console.log(`Generated routes for ${modelName}`);
		});
	}
}

const apiService = new ApiService(path.join(__dirname, "../modules"));

export default (app: Application): void => {
	apiService.generate(app);
};

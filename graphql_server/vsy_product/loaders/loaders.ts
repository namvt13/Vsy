import crypto from "crypto";
import DataLoader from "dataloader";
import {
	Models,
	Product,
	ProductDescription,
	modelNameArray,
	mongoose
} from "../models/models";

const crypticConfig = {
	algorithm: "aes-128-ctr",
	key: crypto.randomBytes(8).toString("hex"),
	iv: crypto.randomBytes(16)
};

function encryptText(text: string) {
	const cipher = crypto.createCipheriv(
		crypticConfig.algorithm,
		crypticConfig.key,
		crypticConfig.iv
	);
	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	// return `${iv.toString("hex")}:${encrypted}`;
	return encrypted;
}
function decryptText(text: string) {
	// const [ivHex, encrypted] = text.split(":");
	// const iv = Buffer.from(ivHex, "hex");
	const decipher = crypto.createDecipheriv(
		crypticConfig.algorithm,
		crypticConfig.key,
		crypticConfig.iv
	);
	let decrypted = decipher.update(text, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
}

function toNodeId(dbId: string, modelName: string) {
	return encryptText(
		JSON.stringify({
			dbId,
			modelName
		})
	);
}
function toDbId(nodeId: string) {
	return JSON.parse(decryptText(nodeId)) as {dbId: string; modelName: string};
}

const createNodeLoaders = (model: Models.baseModelDoc) => {
	return new DataLoader((dbIds: string[]) => {
		return model
			.find({
				_id: {
					$in: dbIds
				}
			})
			.lean()
			.then((docs: any) => {
				if (docs.length === 0) {
					throw Error("No documents found for that id.");
				} else {
					docs.forEach((doc) => {
						doc.__modelName = model.modelName;
						doc.__cursor = encryptText(doc._id.toString());
					});
					return docs;
				}
			})
			.catch((err) => {
				throw Error(
					`Error: ${err.message} Or the id is too long or too short.`
				);
			});
	});
};

const nodeLoaders = {
	[modelNameArray.PRODUCT]: createNodeLoaders(Product),
	[modelNameArray.PRODUCT_DESCRIPTION]: createNodeLoaders(ProductDescription)
};

function getNodeById(nodeId: string) {
	const {dbId, modelName} = toDbId(nodeId);
	return nodeLoaders[modelName].load(dbId);
}

function getAllModelId(modelName: string) {
	return mongoose
		.model(modelName)
		.find({}, "_id")
		.then((docs) => {
			const idArr = docs.map((doc) => {
				return doc._id.toString();
			});
			return {
				idArr,
				modelName
			};
		})
		.catch((err) => {
			throw err;
		});
}

function getAllProductId() {
	return getAllModelId(modelNameArray.PRODUCT);
}
function getAllProductDescriptionId() {
	return getAllModelId(modelNameArray.PRODUCT_DESCRIPTION);
}

function getModelId(
	dbId: string,
	inputModelName: string,
	refField: string,
	returnField: string,
	outputModelName: string
) {
	return mongoose
		.model(inputModelName)
		.findOne(
			{
				[refField]: dbId
			},
			returnField
		)
		.lean()
		.then((row) => {
			if (row) {
				return {
					_id: row[returnField],
					__modelName: outputModelName
				};
			} else {
				throw Error("No document found with that id.");
			}
		})
		.catch((err) => {
			throw err;
		});
}

function getProductDescriptionIdForProduct(productId: string) {
	return getModelId(
		productId,
		modelNameArray.PRODUCT_DESCRIPTION,
		"productId",
		"_id",
		modelNameArray.PRODUCT_DESCRIPTION
	);
}

function getProductIdForProductDescription(productDescriptionId: string) {
	return getModelId(
		productDescriptionId,
		modelNameArray.PRODUCT_DESCRIPTION,
		"_id",
		"productId",
		modelNameArray.PRODUCT
	);
}

function createProduct(args: {
	productModel: string;
	productImage: string;
	productPrice?: number;
	productQuantity?: number;
	productStatus?: boolean;
	productWeight?: number;
}) {
	return new Product(args)
		.save()
		.then((res) => {
			const resObj = res.toObject();
			resObj.__modelName = modelNameArray.PRODUCT;
			return resObj;
		})
		.catch((err) => {
			throw err;
		});
}

function deleteProduct(args: {id: string}) {
	const {dbId, modelName} = toDbId(args.id);

	if (modelName === modelNameArray.PRODUCT) {
		return ProductDescription.findOne({
			productId: dbId
		})
			.then((res) => {
				if (!res) {
					return Product.findByIdAndDelete(dbId).then((res) => {
						if (res) {
							const resObj = res.toObject();
							resObj.__modelName = modelName;
							return resObj;
						} else {
							throw Error("No Product found with that id.");
						}
					});
				} else {
					throw Error(
						"Can't delete. There are some ProductDescription documents depending on this Product."
					);
				}
			})
			.catch((err) => {
				throw err;
			});
	} else {
		throw Error(
			`The provied ID is not belong to the Product collection. It's belong to ${modelName}.`
		);
	}
}

function createProductDescription(args: {
	productName: string;
	productOverview: string;
	productDescription?: string;
	productUrl?: string;
	productViewed?: number;
	productId: string;
}) {
	const {dbId, modelName} = toDbId(args.productId);
	if (modelName === modelNameArray.PRODUCT) {
		const updatedArgs = Object.assign({}, args);
		updatedArgs.productId = dbId;
		return new ProductDescription(updatedArgs)
			.save()
			.then((res) => {
				const resObj = res.toObject();
				resObj.__modelName = modelNameArray.PRODUCT_DESCRIPTION;
				return resObj;
			})
			.catch((err) => {
				throw err;
			});
	} else {
		throw Error(
			`The provied ID is not belong to the Product collection. It's belong to ${modelName}.`
		);
	}
}

function deleteProductDescription(args: {id: string}) {
	const {dbId, modelName} = toDbId(args.id);
	if (modelName === modelNameArray.PRODUCT_DESCRIPTION) {
		return ProductDescription.findByIdAndDelete(dbId)
			.then((res) => {
				if (res) {
					const resObj = res.toObject();
					resObj.__modelName = modelName;
					return resObj;
				} else {
					throw Error("No document found with that ID.");
				}
			})
			.catch((err) => {
				throw err;
			});
	} else {
		throw Error(
			`The provied ID is not belong to the ProductDescription collection. It's belong to ${modelName}.`
		);
	}
}

function connectionCreator(
	modelName: string,
	args: {
		first: number;
		last: number;
		before: string;
		after: string;
	}
) {
	let {first, last, before, after} = args;

	const pageInfo = {
		hasNextPage: false,
		hasPreviousPage: false,
		startCursor: "",
		endCursor: ""
	};

	if (typeof first === "undefined" && typeof last === "undefined") {
		first = 2;
	} else if (first && last) {
		throw Error(
			'Can only filter either "first" or "last" condition, not both of them.'
		);
	} else if (first === 0 || last === 0) {
		return {
			pageInfo,
			edges: []
		};
	}

	return mongoose
		.model(modelName)
		.find()
		.then((docs) => {
			const docObjArr = docs.map((doc) => {
				const docObj = doc.toObject();
				docObj.__modelName = modelName;
				return {
					cursor: encryptText(docObj._id.toString()),
					node: docObj
				};
			});

			return docObjArr;
		})
		.then((edges) => {
			const originalEdgesLength = edges.length;

			if (before) {
				const beforeIdx = edges.findIndex((edge) => {
					return edge.cursor === before;
				});
				edges = edges.splice(0, beforeIdx + 1);
			}
			if (after) {
				const afterIdx = edges.findIndex((edge) => {
					return edge.cursor === after;
				});
				edges = edges.splice(afterIdx + 1, edges.length - 1 - afterIdx);
			}

			if ((last && edges.length > last) || edges.length > first) {
				if (last) {
					pageInfo.hasNextPage = false;
					edges = edges.splice(edges.length - 1 - last, last);
					pageInfo.hasPreviousPage = originalEdgesLength > edges.length;
				} else if (first) {
					pageInfo.hasPreviousPage = false;
					edges = edges.splice(0, first);
					pageInfo.hasNextPage = originalEdgesLength > edges.length;
				}
			}

			pageInfo.startCursor = edges[0].cursor;
			pageInfo.endCursor = edges[edges.length - 1].cursor;

			return {
				pageInfo,
				edges
			};
		})
		.catch((err) => {
			throw err;
		});
}

function productConnectionCreator(args) {
	return connectionCreator(modelNameArray.PRODUCT, args);
}

function productDescriptionConnectionCreator(args) {
	return connectionCreator(modelNameArray.PRODUCT_DESCRIPTION, args);
}

export default {
	toDbId,
	toNodeId,
	getNodeById,
	createProduct,
	deleteProduct,
	createProductDescription,
	deleteProductDescription,
	getProductDescriptionIdForProduct,
	getProductIdForProductDescription,
	getAllProductId,
	getAllProductDescriptionId,
	productConnectionCreator,
	productDescriptionConnectionCreator
};

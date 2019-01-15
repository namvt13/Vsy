import crypto from "crypto";
import DataLoader from "dataloader";
import {mongoose, Shop, ShopInfo, Model} from "../models/models";

function encryptText(text: string) {
	const iv = new Buffer(crypto.randomBytes(16));
	const cipher = crypto.createCipheriv(
		"aes-256-ctr",
		"b2df428b9929d3ace7c598bbf4e496b2",
		iv
	);
	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	return `${iv.toString("hex")}:${encrypted}`;
}

function decryptText(text: string) {
	const [ivHex, encrypted] = text.split(":");
	const iv = Buffer.from(ivHex, "hex");
	const decipher = crypto.createDecipheriv(
		"aes-256-ctr",
		"b2df428b9929d3ace7c598bbf4e496b2",
		iv
	);
	let decrypted = decipher.update(encrypted, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return JSON.parse(decrypted);
}

function toNodeId(dbId: string, modelName: string) {
	return encryptText(
		JSON.stringify({
			modelName,
			dbId
		})
	);
}

function toDbId(nodeId: string) {
	return decryptText(nodeId);
}

const createDataLoader = (model: Model.baseModel) => {
	return new DataLoader((ids: string[]) => {
		return model
			.find({
				_id: {
					$in: ids
				}
			})
			.lean()
			.then((docs) => {
				docs.forEach((doc) => {
					doc.__modelName = model.modelName;
					doc.__cursor = encryptText(JSON.stringify(doc._id));
				});
				return docs;
			})
			.catch((err) => {
				throw err;
			});
	});
};

const nodeLoaders = {
	shops: createDataLoader(Shop),
	shop_infos: createDataLoader(ShopInfo)
};

function getNodeById(nodeId: string) {
	const {modelName, dbId} = toDbId(nodeId);
	return nodeLoaders[modelName].load(dbId);
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
		.then((row) => {
			if (row) {
				return {
					_id: row[returnField],
					__modelName: outputModelName
				};
			}
			throw Error(`No ${inputModelName} with id "${dbId}" found...`);
		})
		.catch((err) => {
			throw err;
		});
}

function getModelAllIds(modelName: string) {
	return mongoose
		.model(modelName)
		.find({}, "_id")
		.lean()
		.then((docs) => {
			if (docs.length > 0) {
				docs.forEach((doc) => {
					doc.__modelName = modelName;
				});
				return docs;
			} else {
				throw Error(`No ids found with model "${modelName}"`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

function getAllShopIds() {
	return getModelAllIds("shops");
}

function getAllShopInfoIds() {
	return getModelAllIds("shop_infos");
}

function getShopInfoIdForShop(src: any) {
	return getModelId(src._id, "shop_infos", "shopId", "_id", "shop_infos");
}

function getShopIdForShopInfo(src: any) {
	return getModelId(src._id, "shop_infos", "_id", "shopId", "shops");
}

function connectionCreator(
	modelIds: {_id: string; __modelName: string}[],
	args: {first: number; last: number; before: string; after: string}
) {
	let {first, last, before, after} = args;

	if (typeof first === "undefined" && typeof last === "undefined") {
		first = 10;
	} else if (first && last) {
		throw Error('Can only take either "first" or "last"...');
	} else if (first === 0 || last === 0) {
		throw Error("Pagination is 0...");
	}

	const modelPromises = modelIds.map((modelId) => {
		const nodeId = toNodeId(modelId._id, modelId.__modelName);
		return getNodeById(nodeId)
			.then((node) => {
				return {
					node,
					cursor: node.__cursor
				};
			})
			.catch((err) => {
				throw err;
			});
	});

	return Promise.all(modelPromises)
		.then((edges: {node: any; cursor: string}[]) => {
			// First sort, then paginate then slice

			if (before) {
				const beforeIdx = edges.findIndex((currEdge) => {
					return currEdge.cursor === before;
				});
				edges = edges.splice(0, beforeIdx + 1);
				if (first) {
					edges.reverse();
				}
			}
			if (after) {
				const afterIdx = edges.findIndex((currEdge) => {
					return currEdge.cursor === after;
				});
				edges = edges.splice(afterIdx + 1, edges.length - 1 - afterIdx);
				if (last) {
					edges.reverse();
				}
			}

			const pageInfo = {
				hasNextPage: false,
				hasPreviousPage: false,
				startCursor: "",
				endCursor: ""
			};

			if ((last && edges.length > last) || edges.length > first) {
				if (last) {
					pageInfo.hasPreviousPage = true;
					edges = edges.splice(edges.length - last, edges.length - 1);
				} else {
					pageInfo.hasNextPage = true;
					edges = edges.splice(0, first);
				}
			}

			pageInfo.startCursor = edges[0].cursor;
			pageInfo.endCursor = edges[edges.length - 1].cursor;

			return {
				edges,
				pageInfo
			};
		})
		.catch((err) => {
			throw err;
		});
}

// function getShopNodeById(dbId: string) {
// 	const nodeId = toNodeId(dbId, "shops");
// 	return getNodeById(nodeId);
// }

// function getShopInfoNodeById(dbId: string) {
// 	const nodeId = toNodeId(dbId, "shop_infos");
// 	return getNodeById(nodeId);
// }

function createShop(shopName: string, shopImage: string) {
	const newShop = new Shop({
		shopName,
		shopImage
	});
	return newShop
		.save()
		.then((shop) => {
			return shop;
		})
		.catch((err) => {
			throw err;
		});
}

function deleteShop(nodeId: string) {
	const {modelName, dbId} = toDbId(nodeId);
	return Shop.findOneAndDelete({
		_id: dbId
	})
		.then((res) => {
			if (res) {
				return {
					deletedId: res._id.toString()
				};
			} else {
				throw Error(`No shop with id "${nodeId}" found...`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

function createShopInfo(
	shopNodeId: string,
	shopAddress: string,
	shopUrl?: string
) {
	const {modelName, dbId} = toDbId(shopNodeId);
	const newShopInfo = new ShopInfo({
		shopAddress,
		shopUrl,
		shopId: dbId
	});
	return newShopInfo
		.save()
		.then((shopInfo) => {
			return shopInfo;
		})
		.catch((err) => {
			throw err;
		});
}

function deleteShopInfo(nodeId: string) {
	const {modelName, dbId} = toDbId(nodeId);
	return ShopInfo.findOneAndDelete({
		_id: dbId
	})
		.then((res) => {
			if (res) {
				return {
					deletedId: res._id.toString()
				};
			} else {
				throw Error("No shop info found");
			}
		})
		.catch((err) => {
			throw err;
		});
}

export default {
	toNodeId,
	getNodeById,
	getShopInfoIdForShop,
	getShopIdForShopInfo,
	getAllShopIds,
	getAllShopInfoIds,
	connectionCreator,
	// getShopNodeById,
	// getShopInfoNodeById,
	createShop,
	deleteShop,
	createShopInfo,
	deleteShopInfo
};

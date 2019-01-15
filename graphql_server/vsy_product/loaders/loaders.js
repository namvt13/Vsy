"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const dataloader_1 = __importDefault(require("dataloader"));
const models_1 = require("../models/models");
const crypticConfig = {
    algorithm: "aes-128-ctr",
    key: crypto_1.default.randomBytes(8).toString("hex"),
    iv: crypto_1.default.randomBytes(16)
};
function encryptText(text) {
    const cipher = crypto_1.default.createCipheriv(crypticConfig.algorithm, crypticConfig.key, crypticConfig.iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}
function decryptText(text) {
    const decipher = crypto_1.default.createDecipheriv(crypticConfig.algorithm, crypticConfig.key, crypticConfig.iv);
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
function toNodeId(dbId, modelName) {
    return encryptText(JSON.stringify({
        dbId,
        modelName
    }));
}
function toDbId(nodeId) {
    return JSON.parse(decryptText(nodeId));
}
const createNodeLoaders = (model) => {
    return new dataloader_1.default((dbIds) => {
        return model
            .find({
            _id: {
                $in: dbIds
            }
        })
            .lean()
            .then((docs) => {
            if (docs.length === 0) {
                throw Error("No documents found for that id.");
            }
            else {
                docs.forEach((doc) => {
                    doc.__modelName = model.modelName;
                    doc.__cursor = encryptText(doc._id.toString());
                });
                return docs;
            }
        })
            .catch((err) => {
            throw Error(`Error: ${err.message} Or the id is too long or too short.`);
        });
    });
};
const nodeLoaders = {
    [models_1.modelNameArray.PRODUCT]: createNodeLoaders(models_1.Product),
    [models_1.modelNameArray.PRODUCT_DESCRIPTION]: createNodeLoaders(models_1.ProductDescription)
};
function getNodeById(nodeId) {
    const { dbId, modelName } = toDbId(nodeId);
    return nodeLoaders[modelName].load(dbId);
}
function getAllModelId(modelName) {
    return models_1.mongoose
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
    return getAllModelId(models_1.modelNameArray.PRODUCT);
}
function getAllProductDescriptionId() {
    return getAllModelId(models_1.modelNameArray.PRODUCT_DESCRIPTION);
}
function getModelId(dbId, inputModelName, refField, returnField, outputModelName) {
    return models_1.mongoose
        .model(inputModelName)
        .findOne({
        [refField]: dbId
    }, returnField)
        .lean()
        .then((row) => {
        if (row) {
            return {
                _id: row[returnField],
                __modelName: outputModelName
            };
        }
        else {
            throw Error("No document found with that id.");
        }
    })
        .catch((err) => {
        throw err;
    });
}
function getProductDescriptionIdForProduct(productId) {
    return getModelId(productId, models_1.modelNameArray.PRODUCT_DESCRIPTION, "productId", "_id", models_1.modelNameArray.PRODUCT_DESCRIPTION);
}
function getProductIdForProductDescription(productDescriptionId) {
    return getModelId(productDescriptionId, models_1.modelNameArray.PRODUCT_DESCRIPTION, "_id", "productId", models_1.modelNameArray.PRODUCT);
}
function createProduct(args) {
    return new models_1.Product(args)
        .save()
        .then((res) => {
        const resObj = res.toObject();
        resObj.__modelName = models_1.modelNameArray.PRODUCT;
        return resObj;
    })
        .catch((err) => {
        throw err;
    });
}
function deleteProduct(args) {
    const { dbId, modelName } = toDbId(args.id);
    if (modelName === models_1.modelNameArray.PRODUCT) {
        return models_1.ProductDescription.findOne({
            productId: dbId
        })
            .then((res) => {
            if (!res) {
                return models_1.Product.findByIdAndDelete(dbId).then((res) => {
                    if (res) {
                        const resObj = res.toObject();
                        resObj.__modelName = modelName;
                        return resObj;
                    }
                    else {
                        throw Error("No Product found with that id.");
                    }
                });
            }
            else {
                throw Error("Can't delete. There are some ProductDescription documents depending on this Product.");
            }
        })
            .catch((err) => {
            throw err;
        });
    }
    else {
        throw Error(`The provied ID is not belong to the Product collection. It's belong to ${modelName}.`);
    }
}
function createProductDescription(args) {
    const { dbId, modelName } = toDbId(args.productId);
    if (modelName === models_1.modelNameArray.PRODUCT) {
        const updatedArgs = Object.assign({}, args);
        updatedArgs.productId = dbId;
        return new models_1.ProductDescription(updatedArgs)
            .save()
            .then((res) => {
            const resObj = res.toObject();
            resObj.__modelName = models_1.modelNameArray.PRODUCT_DESCRIPTION;
            return resObj;
        })
            .catch((err) => {
            throw err;
        });
    }
    else {
        throw Error(`The provied ID is not belong to the Product collection. It's belong to ${modelName}.`);
    }
}
function deleteProductDescription(args) {
    const { dbId, modelName } = toDbId(args.id);
    if (modelName === models_1.modelNameArray.PRODUCT_DESCRIPTION) {
        return models_1.ProductDescription.findByIdAndDelete(dbId)
            .then((res) => {
            if (res) {
                const resObj = res.toObject();
                resObj.__modelName = modelName;
                return resObj;
            }
            else {
                throw Error("No document found with that ID.");
            }
        })
            .catch((err) => {
            throw err;
        });
    }
    else {
        throw Error(`The provied ID is not belong to the ProductDescription collection. It's belong to ${modelName}.`);
    }
}
function connectionCreator(modelName, args) {
    let { first, last, before, after } = args;
    const pageInfo = {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "",
        endCursor: ""
    };
    if (typeof first === "undefined" && typeof last === "undefined") {
        first = 2;
    }
    else if (first && last) {
        throw Error('Can only filter either "first" or "last" condition, not both of them.');
    }
    else if (first === 0 || last === 0) {
        return {
            pageInfo,
            edges: []
        };
    }
    return models_1.mongoose
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
            }
            else if (first) {
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
    return connectionCreator(models_1.modelNameArray.PRODUCT, args);
}
function productDescriptionConnectionCreator(args) {
    return connectionCreator(models_1.modelNameArray.PRODUCT_DESCRIPTION, args);
}
exports.default = {
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

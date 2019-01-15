"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const moment_1 = __importDefault(require("moment"));
const loaders_1 = __importDefault(require("./loaders/loaders"));
const models_1 = __importDefault(require("./models/models"));
function resolveId(src) {
    return loaders_1.default.toNodeId(src._id, src.__modelName);
}
function formatTime(time) {
    return moment_1.default(time).format("llll");
}
const NodeInterface = new graphql_1.GraphQLInterfaceType({
    name: "Node",
    fields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        }
    },
    resolveType: (src) => {
        if (src.__modelName === models_1.default.modelNameArray.PRODUCT) {
            return ProductType;
        }
        else {
            return ProductDescriptionType;
        }
    }
});
exports.NodeInterface = NodeInterface;
const PageInfoType = new graphql_1.GraphQLObjectType({
    name: "PageInfo",
    fields: {
        hasNextPage: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean)
        },
        hasPreviousPage: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean)
        },
        startCursor: {
            type: graphql_1.GraphQLString
        },
        endCursor: {
            type: graphql_1.GraphQLString
        }
    }
});
const DeletedIdType = new graphql_1.GraphQLObjectType({
    name: "DeletedId",
    fields: {
        deletedId: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            resolve: (src) => {
                return resolveId(src);
            }
        }
    }
});
exports.DeletedIdType = DeletedIdType;
const ProductType = new graphql_1.GraphQLObjectType({
    name: "Product",
    interfaces: [NodeInterface],
    fields: () => {
        return {
            id: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                resolve: resolveId
            },
            productModel: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            productImage: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            productPrice: {
                type: graphql_1.GraphQLFloat
            },
            productQuantity: {
                type: graphql_1.GraphQLInt
            },
            productStatus: {
                type: graphql_1.GraphQLBoolean
            },
            productWeight: {
                type: graphql_1.GraphQLFloat
            },
            productDateAvailable: {
                type: graphql_1.GraphQLString
            },
            createdAt: {
                type: graphql_1.GraphQLString,
                resolve: (src) => {
                    return formatTime(src.createdAt);
                }
            },
            updatedAt: {
                type: graphql_1.GraphQLString,
                resolve: (src) => {
                    return formatTime(src.updatedAt);
                }
            },
            productDescription: {
                type: ProductDescriptionType,
                resolve: (src) => {
                    return loaders_1.default
                        .getProductDescriptionIdForProduct(src._id)
                        .then((res) => {
                        const nodeId = loaders_1.default.toNodeId(res._id, res.__modelName);
                        return loaders_1.default.getNodeById(nodeId);
                    });
                }
            }
        };
    }
});
exports.ProductType = ProductType;
const ProductDescriptionType = new graphql_1.GraphQLObjectType({
    name: "ProductDescription",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            resolve: resolveId
        },
        productName: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        productOverview: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        productDescription: {
            type: graphql_1.GraphQLString
        },
        productUrl: {
            type: graphql_1.GraphQLString
        },
        productViewed: {
            type: graphql_1.GraphQLInt
        },
        product: {
            type: ProductType,
            resolve: (src) => {
                return loaders_1.default
                    .getProductIdForProductDescription(src._id)
                    .then((res) => {
                    const nodeId = loaders_1.default.toNodeId(res._id, res.__modelName);
                    return loaders_1.default.getNodeById(nodeId);
                });
            }
        }
    }
});
exports.ProductDescriptionType = ProductDescriptionType;
const ProductEdgeType = new graphql_1.GraphQLObjectType({
    name: "ProductEdge",
    fields: {
        cursor: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        node: {
            type: new graphql_1.GraphQLNonNull(ProductType),
            resolve: (src) => {
                return src.node;
            }
        }
    }
});
const ProductDescriptionEdgeType = new graphql_1.GraphQLObjectType({
    name: "ProductionDescriptionEdge",
    fields: {
        cursor: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        node: {
            type: new graphql_1.GraphQLNonNull(ProductDescriptionType)
        }
    }
});
const ProductConnectionType = new graphql_1.GraphQLObjectType({
    name: "ProductConnection",
    fields: {
        pageInfo: {
            type: new graphql_1.GraphQLNonNull(PageInfoType)
        },
        edges: {
            type: new graphql_1.GraphQLList(ProductEdgeType)
        }
    }
});
const ProductDescriptionConnectionType = new graphql_1.GraphQLObjectType({
    name: "ProductDescripitonConnection",
    fields: {
        pageInfo: {
            type: new graphql_1.GraphQLNonNull(PageInfoType)
        },
        edges: {
            type: new graphql_1.GraphQLList(ProductDescriptionEdgeType)
        }
    }
});
const ViewerType = new graphql_1.GraphQLObjectType({
    name: "Viewer",
    fields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            resolve: (src) => {
                return src;
            }
        },
        Product: {
            type: ProductType,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.getNodeById(args.id);
            }
        },
        ProductDescription: {
            type: ProductDescriptionType,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.getNodeById(args.id);
            }
        },
        allProducts: {
            type: ProductConnectionType,
            args: {
                first: {
                    type: graphql_1.GraphQLInt
                },
                last: {
                    type: graphql_1.GraphQLInt
                },
                before: {
                    type: graphql_1.GraphQLString
                },
                after: {
                    type: graphql_1.GraphQLString
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.productConnectionCreator(args);
            }
        },
        allProductDescriptions: {
            type: ProductDescriptionConnectionType,
            args: {
                first: {
                    type: graphql_1.GraphQLInt
                },
                last: {
                    type: graphql_1.GraphQLInt
                },
                before: {
                    type: graphql_1.GraphQLString
                },
                after: {
                    type: graphql_1.GraphQLString
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.productDescriptionConnectionCreator(args);
            }
        }
    }
});
exports.ViewerType = ViewerType;

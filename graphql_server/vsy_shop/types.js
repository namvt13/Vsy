"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const moment_1 = __importDefault(require("moment"));
const loaders_1 = __importDefault(require("./loaders/loaders"));
const NodeInterface = new graphql_1.GraphQLInterfaceType({
    name: "Node",
    fields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        }
    },
    resolveType: (src) => {
        if (src.__modelName === "shops") {
            return ShopType;
        }
        else if (src.__modelName === "shop_infos") {
            return ShopInfoType;
        }
    }
});
exports.NodeInterface = NodeInterface;
function resolveDbIb(src) {
    return loaders_1.default.toNodeId(src._id, src.__modelName);
}
function dateToString(fieldName) {
    return (src) => {
        return moment_1.default(src[fieldName]).format("llll");
    };
}
const ShopType = new graphql_1.GraphQLObjectType({
    name: "Shop",
    interfaces: [NodeInterface],
    fields: () => {
        return {
            id: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                resolve: resolveDbIb
            },
            shopName: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            shopImage: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            ShopInfo: {
                type: ShopInfoType,
                resolve: (src) => {
                    return loaders_1.default.getShopInfoIdForShop(src).then((shopInfo) => {
                        const nodeId = loaders_1.default.toNodeId(shopInfo._id, shopInfo.__modelName);
                        return loaders_1.default.getNodeById(nodeId);
                    });
                }
            }
        };
    }
});
exports.ShopType = ShopType;
const ShopInfoType = new graphql_1.GraphQLObjectType({
    name: "ShopInfo",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            resolve: resolveDbIb
        },
        shopAddress: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        shopUrl: {
            type: graphql_1.GraphQLString
        },
        urlClicked: {
            type: graphql_1.GraphQLInt
        },
        dateLastClick: {
            type: graphql_1.GraphQLInt
        },
        updatedAt: {
            type: graphql_1.GraphQLString,
            resolve: dateToString("updatedAt")
        },
        createdAt: {
            type: graphql_1.GraphQLString,
            resolve: dateToString("createdAt")
        },
        Shop: {
            type: ShopType,
            resolve: (src) => {
                return loaders_1.default.getShopIdForShopInfo(src).then((shop) => {
                    const nodeId = loaders_1.default.toNodeId(shop._id, shop.__modelName);
                    return loaders_1.default.getNodeById(nodeId);
                });
            }
        }
    }
});
exports.ShopInfoType = ShopInfoType;
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
const ShopEdgeType = new graphql_1.GraphQLObjectType({
    name: "ShopEdge",
    fields: {
        cursor: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        node: {
            type: new graphql_1.GraphQLNonNull(ShopType)
        }
    }
});
const ShopConnectionType = new graphql_1.GraphQLObjectType({
    name: "ShopConnection",
    fields: {
        pageInfo: {
            type: new graphql_1.GraphQLNonNull(PageInfoType)
        },
        edges: {
            type: new graphql_1.GraphQLList(ShopEdgeType)
        }
    }
});
const ShopInfoEdgeType = new graphql_1.GraphQLObjectType({
    name: "ShopInfoEdge",
    fields: {
        cursor: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        node: {
            type: new graphql_1.GraphQLNonNull(ShopInfoType)
        }
    }
});
const ShopInfoConnectionType = new graphql_1.GraphQLObjectType({
    name: "ShopInfoConnection",
    fields: {
        pageInfo: {
            type: new graphql_1.GraphQLNonNull(PageInfoType)
        },
        edges: {
            type: new graphql_1.GraphQLList(ShopInfoEdgeType)
        }
    }
});
const ViewerType = new graphql_1.GraphQLObjectType({
    name: "Viewer",
    fields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: (src) => {
                return src;
            }
        },
        Shop: {
            type: ShopType,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.getNodeById(args.id);
            }
        },
        ShopInfo: {
            type: ShopInfoType,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.getNodeById(args.id);
            }
        },
        allShops: {
            type: ShopConnectionType,
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
                return loaders_1.default
                    .getAllShopIds()
                    .then((shopIds) => {
                    return loaders_1.default.connectionCreator(shopIds, args);
                })
                    .catch((err) => {
                    throw err;
                });
            }
        },
        allShopInfos: {
            type: ShopInfoConnectionType,
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
                return loaders_1.default
                    .getAllShopInfoIds()
                    .then((shopInfoIds) => {
                    return loaders_1.default.connectionCreator(shopInfoIds, args);
                })
                    .catch((err) => {
                    throw err;
                });
            }
        }
    }
});
exports.ViewerType = ViewerType;
const DeletedType = new graphql_1.GraphQLObjectType({
    name: "DeletedId",
    fields: {
        deletedId: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        }
    }
});
exports.DeletedType = DeletedType;

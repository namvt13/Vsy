"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_1 = require("graphql");
const loaders_1 = __importDefault(require("./loaders/loaders"));
const types_1 = require("./types");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    description: "The root query",
    fields: {
        viewer: {
            type: new graphql_1.GraphQLNonNull(types_1.ViewerType),
            resolve: () => {
                return "AntonioPierre";
            }
        },
        node: {
            type: types_1.NodeInterface,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                },
                modelName: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                }
            },
            resolve: (src, args) => {
                const nodeId = loaders_1.default.toNodeId(args.id, args.modelName);
                return loaders_1.default.getNodeById(nodeId);
            }
        }
    }
});
const RootMutation = new graphql_1.GraphQLObjectType({
    name: "RootMutation",
    description: "The root mutation",
    fields: {
        createShop: {
            type: types_1.ShopType,
            args: {
                shopName: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                },
                shopImage: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.createShop(args.shopName, args.shopImage);
            }
        },
        deleteShop: {
            type: types_1.DeletedType,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.deleteShop(args.id);
            }
        },
        createShopInfo: {
            type: types_1.ShopInfoType,
            args: {
                shopAddress: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                },
                shopUrl: {
                    type: graphql_1.GraphQLString
                },
                shopId: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.createShopInfo(args.shopId, args.shopAddress, args.shopUrl);
            }
        },
        deleteShopInfo: {
            type: types_1.DeletedType,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.deleteShopInfo(args.id);
            }
        }
    }
});
const Schema = new graphql_1.GraphQLSchema({
    types: [types_1.ShopType, types_1.ShopInfoType],
    query: RootQuery,
    mutation: RootMutation
});
const app = express_1.default();
app.use("/graphql", express_graphql_1.default({
    schema: Schema,
    graphiql: true,
    pretty: true
}));
app.listen(4000, () => {
    console.log("GraphQL API Server is listening @ http://localhost:4000/graphql");
});

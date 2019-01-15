"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_1 = require("graphql");
const loaders_1 = __importDefault(require("./loaders/loaders"));
const models_1 = __importDefault(require("./models/models"));
const types_1 = require("./types");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    description: "The root query",
    fields: {
        viewer: {
            type: new graphql_1.GraphQLNonNull(types_1.ViewerType),
            resolve: (src) => {
                return "Anto123";
            }
        },
        node: {
            type: types_1.NodeInterface,
            args: {
                dbId: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                },
                modelName: {
                    type: new graphql_1.GraphQLEnumType({
                        name: "ModelNames",
                        values: {
                            PRODUCT: {
                                value: models_1.default.modelNameArray.PRODUCT
                            },
                            PRODUCT_DESCRIPTION: {
                                value: models_1.default.modelNameArray.PRODUCT_DESCRIPTION
                            }
                        }
                    })
                }
            },
            resolve: (src, args) => {
                const nodeId = loaders_1.default.toNodeId(args.dbId, args.modelName);
                return loaders_1.default.getNodeById(nodeId);
            }
        }
    }
});
const RootMutation = new graphql_1.GraphQLObjectType({
    name: "RootMutation",
    description: "The root mutation",
    fields: {
        createProduct: {
            type: types_1.ProductType,
            args: {
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
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.createProduct(args);
            }
        },
        deleteProduct: {
            type: types_1.DeletedIdType,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.deleteProduct(args);
            }
        },
        createProductDescription: {
            type: types_1.ProductDescriptionType,
            args: {
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
                productId: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.createProductDescription(args);
            }
        },
        deleteProductDescription: {
            type: types_1.DeletedIdType,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: (src, args) => {
                return loaders_1.default.deleteProductDescription(args);
            }
        }
    }
});
const Schema = new graphql_1.GraphQLSchema({
    types: [types_1.ProductType, types_1.ProductDescriptionType],
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
    console.log("GrpahQL API Server is listening @ http://localhost:4000/graphql");
});

import express from "express";
import graphqlHTTP from "express-graphql";
import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLID,
	GraphQLString,
	GraphQLEnumType,
	GraphQLFloat,
	GraphQLBoolean,
	GraphQLInt
} from "graphql";
import loaders from "./loaders/loaders";
import models from "./models/models";
import {
	NodeInterface,
	ViewerType,
	DeletedIdType,
	ProductType,
	ProductDescriptionType
} from "./types";

const RootQuery = new GraphQLObjectType({
	name: "RootQuery",
	description: "The root query",
	fields: {
		viewer: {
			type: new GraphQLNonNull(ViewerType),
			resolve: (src) => {
				return "Anto123";
			}
		},
		node: {
			type: NodeInterface,
			args: {
				dbId: {
					type: new GraphQLNonNull(GraphQLID)
				},
				modelName: {
					type: new GraphQLEnumType({
						name: "ModelNames",
						values: {
							PRODUCT: {
								value: models.modelNameArray.PRODUCT
							},
							PRODUCT_DESCRIPTION: {
								value: models.modelNameArray.PRODUCT_DESCRIPTION
							}
						}
					})
				}
			},
			resolve: (src, args) => {
				const nodeId = loaders.toNodeId(args.dbId, args.modelName);
				return loaders.getNodeById(nodeId);
			}
		}
	}
});

const RootMutation = new GraphQLObjectType({
	name: "RootMutation",
	description: "The root mutation",
	fields: {
		createProduct: {
			type: ProductType,
			args: {
				productModel: {
					type: new GraphQLNonNull(GraphQLString)
				},
				productImage: {
					type: new GraphQLNonNull(GraphQLString)
				},
				productPrice: {
					type: GraphQLFloat
				},
				productQuantity: {
					type: GraphQLInt
				},
				productStatus: {
					type: GraphQLBoolean
				},
				productWeight: {
					type: GraphQLFloat
				}
			},
			resolve: (src, args) => {
				return loaders.createProduct(args as any);
			}
		},
		deleteProduct: {
			type: DeletedIdType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (src, args) => {
				return loaders.deleteProduct(args as any);
			}
		},
		createProductDescription: {
			type: ProductDescriptionType,
			args: {
				productName: {
					type: new GraphQLNonNull(GraphQLString)
				},
				productOverview: {
					type: new GraphQLNonNull(GraphQLString)
				},
				productDescription: {
					type: GraphQLString
				},
				productUrl: {
					type: GraphQLString
				},
				productId: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (src, args) => {
				return loaders.createProductDescription(args as any);
			}
		},
		deleteProductDescription: {
			type: DeletedIdType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (src, args) => {
				return loaders.deleteProductDescription(args as any);
			}
		}
	}
});

const Schema = new GraphQLSchema({
	types: [ProductType, ProductDescriptionType],
	query: RootQuery,
	mutation: RootMutation
});

const app = express();
app.use(
	"/graphql",
	graphqlHTTP({
		schema: Schema,
		graphiql: true,
		pretty: true
	})
);

app.listen(4000, () => {
	console.log(
		"GrpahQL API Server is listening @ http://localhost:4000/graphql"
	);
});

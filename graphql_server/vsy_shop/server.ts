import express from "express";
import graphqlHTTP from "express-graphql";
import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLID,
	GraphQLString,
	GraphQLInt
} from "graphql";
import loaders from "./loaders/loaders";
import {
	NodeInterface,
	ShopType,
	ShopInfoType,
	ViewerType,
	DeletedType
} from "./types";

const RootQuery = new GraphQLObjectType({
	name: "RootQuery",
	description: "The root query",
	fields: {
		viewer: {
			type: new GraphQLNonNull(ViewerType),
			resolve: () => {
				return "AntonioPierre";
			}
		},
		node: {
			type: NodeInterface,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				},
				modelName: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (src, args) => {
				const nodeId = loaders.toNodeId(args.id, args.modelName);
				return loaders.getNodeById(nodeId);
			}
		}
	}
});

const RootMutation = new GraphQLObjectType({
	name: "RootMutation",
	description: "The root mutation",
	fields: {
		createShop: {
			type: ShopType,
			args: {
				shopName: {
					type: new GraphQLNonNull(GraphQLString)
				},
				shopImage: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (src, args) => {
				return loaders.createShop(args.shopName, args.shopImage);
			}
		},
		deleteShop: {
			type: DeletedType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (src, args) => {
				return loaders.deleteShop(args.id);
			}
		},
		createShopInfo: {
			type: ShopInfoType,
			args: {
				shopAddress: {
					type: new GraphQLNonNull(GraphQLString)
				},
				shopUrl: {
					type: GraphQLString
				},
				shopId: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (src, args) => {
				return loaders.createShopInfo(
					args.shopId,
					args.shopAddress,
					args.shopUrl
				);
			}
		},
		deleteShopInfo: {
			type: DeletedType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (src, args) => {
				return loaders.deleteShopInfo(args.id);
			}
		}
	}
});

const Schema = new GraphQLSchema({
	types: [ShopType, ShopInfoType],
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
		"GraphQL API Server is listening @ http://localhost:4000/graphql"
	);
});

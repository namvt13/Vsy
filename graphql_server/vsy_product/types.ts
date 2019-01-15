import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLInterfaceType,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean,
	GraphQLList
} from "graphql";
import moment from "moment";
import loaders from "./loaders/loaders";
import models from "./models/models";

function resolveId(src) {
	return loaders.toNodeId(src._id, src.__modelName);
}

function formatTime(time: number) {
	return moment(time).format("llll");
}

// Node interface, this will be used to access all documents using just a nodeId.
const NodeInterface = new GraphQLInterfaceType({
	name: "Node",
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolveType: (src) => {
		if (src.__modelName === models.modelNameArray.PRODUCT) {
			return ProductType;
		} else {
			return ProductDescriptionType;
		}
	}
});
const PageInfoType = new GraphQLObjectType({
	name: "PageInfo",
	fields: {
		hasNextPage: {
			type: new GraphQLNonNull(GraphQLBoolean)
		},
		hasPreviousPage: {
			type: new GraphQLNonNull(GraphQLBoolean)
		},
		startCursor: {
			type: GraphQLString
		},
		endCursor: {
			type: GraphQLString
		}
	}
});
const DeletedIdType = new GraphQLObjectType({
	name: "DeletedId",
	fields: {
		deletedId: {
			type: new GraphQLNonNull(GraphQLID),
			resolve: (src) => {
				return resolveId(src);
			}
		}
	}
});

const ProductType = new GraphQLObjectType({
	name: "Product",
	interfaces: [NodeInterface],
	fields: () => {
		return {
			id: {
				type: new GraphQLNonNull(GraphQLID),
				resolve: resolveId
			},
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
			},
			productDateAvailable: {
				type: GraphQLString
			},
			createdAt: {
				type: GraphQLString,
				resolve: (src) => {
					return formatTime(src.createdAt);
				}
			},
			updatedAt: {
				type: GraphQLString,
				resolve: (src) => {
					return formatTime(src.updatedAt);
				}
			},
			productDescription: {
				type: ProductDescriptionType,
				resolve: (src) => {
					return loaders
						.getProductDescriptionIdForProduct(src._id)
						.then((res) => {
							const nodeId = loaders.toNodeId(res._id, res.__modelName);
							return loaders.getNodeById(nodeId);
						});
				}
			}
		};
	}
});
const ProductDescriptionType = new GraphQLObjectType({
	name: "ProductDescription",
	interfaces: [NodeInterface],
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
			resolve: resolveId
		},
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
		productViewed: {
			type: GraphQLInt
		},
		product: {
			type: ProductType,
			resolve: (src) => {
				return loaders
					.getProductIdForProductDescription(src._id)
					.then((res) => {
						const nodeId = loaders.toNodeId(res._id, res.__modelName);
						return loaders.getNodeById(nodeId);
					});
			}
		}
	}
});

const ProductEdgeType = new GraphQLObjectType({
	name: "ProductEdge",
	fields: {
		cursor: {
			type: new GraphQLNonNull(GraphQLString)
		},
		node: {
			type: new GraphQLNonNull(ProductType),
			resolve: (src) => {
				return src.node;
			}
		}
	}
});
const ProductDescriptionEdgeType = new GraphQLObjectType({
	name: "ProductionDescriptionEdge",
	fields: {
		cursor: {
			type: new GraphQLNonNull(GraphQLString)
		},
		node: {
			type: new GraphQLNonNull(ProductDescriptionType)
		}
	}
});

const ProductConnectionType = new GraphQLObjectType({
	name: "ProductConnection",
	fields: {
		pageInfo: {
			type: new GraphQLNonNull(PageInfoType)
		},
		edges: {
			type: new GraphQLList(ProductEdgeType)
		}
	}
});
const ProductDescriptionConnectionType = new GraphQLObjectType({
	name: "ProductDescripitonConnection",
	fields: {
		pageInfo: {
			type: new GraphQLNonNull(PageInfoType)
		},
		edges: {
			type: new GraphQLList(ProductDescriptionEdgeType)
		}
	}
});

const ViewerType = new GraphQLObjectType({
	name: "Viewer",
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
			resolve: (src) => {
				return src;
			}
		},
		Product: {
			type: ProductType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (src, args) => {
				return loaders.getNodeById(args.id);
			}
		},
		ProductDescription: {
			type: ProductDescriptionType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (src, args) => {
				return loaders.getNodeById(args.id);
			}
		},
		allProducts: {
			type: ProductConnectionType,
			args: {
				first: {
					type: GraphQLInt
				},
				last: {
					type: GraphQLInt
				},
				before: {
					type: GraphQLString
				},
				after: {
					type: GraphQLString
				}
			},
			resolve: (src, args) => {
				return loaders.productConnectionCreator(args);
			}
		},
		allProductDescriptions: {
			type: ProductDescriptionConnectionType,
			args: {
				first: {
					type: GraphQLInt
				},
				last: {
					type: GraphQLInt
				},
				before: {
					type: GraphQLString
				},
				after: {
					type: GraphQLString
				}
			},
			resolve: (src, args) => {
				return loaders.productDescriptionConnectionCreator(args);
			}
		}
	}
});

export {
	NodeInterface,
	ProductType,
	ProductDescriptionType,
	DeletedIdType,
	ViewerType
};

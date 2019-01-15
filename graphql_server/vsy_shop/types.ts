import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLInterfaceType,
	GraphQLBoolean,
	GraphQLList
} from "graphql";
import moment from "moment";
import loaders from "./loaders/loaders";

const NodeInterface = new GraphQLInterfaceType({
	name: "Node",
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolveType: (src) => {
		if (src.__modelName === "shops") {
			return ShopType;
		} else if (src.__modelName === "shop_infos") {
			return ShopInfoType;
		}
	}
});

function resolveDbIb(src) {
	return loaders.toNodeId(src._id, src.__modelName);
}

function dateToString(fieldName: string) {
	return (src: any) => {
		return moment(src[fieldName]).format("llll");
	};
}

const ShopType = new GraphQLObjectType({
	name: "Shop",
	interfaces: [NodeInterface],
	fields: () => {
		return {
			id: {
				type: new GraphQLNonNull(GraphQLID),
				resolve: resolveDbIb
			},
			shopName: {
				type: new GraphQLNonNull(GraphQLString)
			},
			shopImage: {
				type: new GraphQLNonNull(GraphQLString)
			},
			ShopInfo: {
				type: ShopInfoType,
				resolve: (src) => {
					return loaders.getShopInfoIdForShop(src).then((shopInfo) => {
						const nodeId = loaders.toNodeId(shopInfo._id, shopInfo.__modelName);
						return loaders.getNodeById(nodeId);
					});
				}
			}
		};
	}
});

const ShopInfoType = new GraphQLObjectType({
	name: "ShopInfo",
	interfaces: [NodeInterface],
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
			resolve: resolveDbIb
		},
		shopAddress: {
			type: new GraphQLNonNull(GraphQLString)
		},
		shopUrl: {
			type: GraphQLString
		},
		urlClicked: {
			type: GraphQLInt
		},
		dateLastClick: {
			type: GraphQLInt
		},
		updatedAt: {
			type: GraphQLString,
			resolve: dateToString("updatedAt")
		},
		createdAt: {
			type: GraphQLString,
			resolve: dateToString("createdAt")
		},
		Shop: {
			type: ShopType!,
			resolve: (src) => {
				return loaders.getShopIdForShopInfo(src).then((shop) => {
					const nodeId = loaders.toNodeId(shop._id, shop.__modelName);
					return loaders.getNodeById(nodeId);
				});
			}
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

const ShopEdgeType = new GraphQLObjectType({
	name: "ShopEdge",
	fields: {
		cursor: {
			type: new GraphQLNonNull(GraphQLString)
		},
		node: {
			type: new GraphQLNonNull(ShopType)
		}
	}
});

const ShopConnectionType = new GraphQLObjectType({
	name: "ShopConnection",
	fields: {
		pageInfo: {
			type: new GraphQLNonNull(PageInfoType)
		},
		edges: {
			type: new GraphQLList(ShopEdgeType)
		}
	}
});

const ShopInfoEdgeType = new GraphQLObjectType({
	name: "ShopInfoEdge",
	fields: {
		cursor: {
			type: new GraphQLNonNull(GraphQLString)
		},
		node: {
			type: new GraphQLNonNull(ShopInfoType)
		}
	}
});

const ShopInfoConnectionType = new GraphQLObjectType({
	name: "ShopInfoConnection",
	fields: {
		pageInfo: {
			type: new GraphQLNonNull(PageInfoType)
		},
		edges: {
			type: new GraphQLList(ShopInfoEdgeType)
		}
	}
});

interface IAllArgs {
	first: number;
	last: number;
	before: string;
	after: string;
}
const ViewerType = new GraphQLObjectType({
	name: "Viewer",
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (src) => {
				return src;
			}
		},
		Shop: {
			type: ShopType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (src, args) => {
				// Find by nodeId
				return loaders.getNodeById(args.id);
			}
		},
		ShopInfo: {
			type: ShopInfoType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (src, args) => {
				// Find by nodeId
				return loaders.getNodeById(args.id);
			}
		},
		allShops: {
			type: ShopConnectionType,
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
			resolve: (src, args: any) => {
				return loaders
					.getAllShopIds()
					.then((shopIds: {_id: string; __modelName: string}[]) => {
						return loaders.connectionCreator(shopIds, args);
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
			resolve: (src, args: any) => {
				return loaders
					.getAllShopInfoIds()
					.then((shopInfoIds) => {
						return loaders.connectionCreator(shopInfoIds, args);
					})
					.catch((err) => {
						throw err;
					});
			}
		}
	}
});

const DeletedType = new GraphQLObjectType({
	name: "DeletedId",
	fields: {
		deletedId: {
			type: new GraphQLNonNull(GraphQLID)
		}
	}
});

export {NodeInterface, ShopType, ShopInfoType, ViewerType, DeletedType};

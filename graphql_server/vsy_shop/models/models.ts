import mongoose from "mongoose";

// Connect mongoose to mongodb server
mongoose.connect(
	"mongodb://localhost:27017/vsy",
	{
		useNewUrlParser: true,
		useCreateIndex: true
	}
);

// Listen to mongoose errors
const db = mongoose.connection;
db.on("error", console.error);
db.on("open", () => {
	console.log("Mongoose connected to MongoDB server...");
});

// Interfaces for schema
interface IShop extends mongoose.Document {
	shopName: string;
	shopImage: string;
	__modelName: string;
	__cursor: string;
}
interface IShopInfo extends mongoose.Document {
	shopAddress: string;
	shopUrl: string;
	urlClicked: number;
	dateLastClick: number;
	shopId: string;
	__modelName: string;
	__cursor: string;
}

// Create schema
const ShopSchema = new mongoose.Schema({
	shopName: String,
	shopImage: String
});
const ShopInfoSchema = new mongoose.Schema(
	{
		shopAddress: String,
		shopUrl: String,
		urlClicked: Number,
		dateLastClick: Date,
		shopId: {
			type: String,
			required: true,
			validate: {
				isAsync: true,
				validator: (inputShopId: string) => {
					console.log(inputShopId);
					return mongoose
						.model("shops")
						.find({}, "_id")
						.then((shops) => {
							const inputShop = shops.find((shop) => {
								return shop._id.toString() === inputShopId;
							});
							if (inputShop) {
								return mongoose
									.model("shop_infos")
									.find({}, "shopId")
									.then((shop_infos) => {
										const refShopInfo = shop_infos.find((shop_info) => {
											return (shop_info as any).shopId === inputShopId;
										});
										return refShopInfo ? false : true;
									});
							} else {
								return false;
							}
						});
				}
			}
		}
	},
	{
		timestamps: true
	}
);

// Create models
const Shop = mongoose.model("shops", ShopSchema) as mongoose.Model<IShop, {}>;
const ShopInfo = mongoose.model("shop_infos", ShopInfoSchema) as mongoose.Model<
	IShopInfo,
	{}
>;

// new ShopInfo({
// 	shopAddress: "vintage, NY, USA",
// 	shopUrl: "us.vintageshop.com",
// 	shopId: "5c2ef50266f503707a3d6fc0"
// }).save((err, shopInfo1Doc) => {
// 	if (err) {
// 		throw err;
// 	}
// 	console.log("All Done!!!");
// 	process.exit();
// });

namespace Model {
	export type baseModel = mongoose.Model<IShop | IShopInfo, {}>;
	export type shopModel = IShop;
	export type shopInfoModel = IShopInfo;
}

export {mongoose, Shop, ShopInfo, Model};

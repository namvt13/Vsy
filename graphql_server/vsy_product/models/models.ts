import mongoose, {Schema} from "mongoose";
import loaders from "../loaders/loaders";

mongoose.connect(
	"mongodb://localhost:27017/vsy",
	{
		useNewUrlParser: true,
		useCreateIndex: true
	}
);

const db = mongoose.connection;
db.on("error", console.error);
db.on("open", () => {
	console.log("Mongoose connected to MongoDB server...");
});

const modelNameArray = {
	PRODUCT: "products",
	PRODUCT_DESCRIPTION: "product_descriptions"
};

// Interfaces for models
interface IProduct {
	productModel: string;
	productImage: string;
	productPrice: number;
	productQuantity: number;
	productStatus: boolean;
	productWeight: number;
	productDateAvailable: number;
	createdAt: number;
	updatedAt: number;
	__modelName: string;
	__cursor: string;
}
interface IProductDescription {
	productName: string;
	productOverview: string;
	productDescription: string;
	productUrl: string;
	productViewed: number;
	productId: string;
	__modelName: string;
	__cursor: string;
}
interface IProductDoc extends mongoose.Document, IProduct {}
interface IProductDescriptionDoc
	extends mongoose.Document,
		IProductDescription {}

// Create schema
const ProductSchema = new Schema(
	{
		productModel: String,
		productImage: String,
		productPrice: Number,
		productQuantity: Number,
		productStatus: Boolean,
		productWeight: Number,
		productDateAvailable: Number
	},
	{
		timestamps: true
	}
);
const ProductDescriptionSchema = new Schema({
	productName: String,
	productOverview: String,
	productDescription: String,
	productUrl: String,
	productViewed: Number,
	productId: {
		type: Schema.Types.ObjectId,
		required: true,
		validate: {
			isAsync: true,
			validator: (inputNodeId: string) => {
				return Product.findById(inputNodeId, "_id").then((foundProduct) => {
					if (foundProduct) {
						return ProductDescription.findOne(
							{
								productId: foundProduct._id
							},
							"_id"
						)
							.then((foundProductDescription) => {
								if (foundProductDescription) {
									return false;
								} else {
									return true;
								}
							})
							.catch((err) => {
								return false;
							});
					} else {
						return false;
					}
				});
			}
		}
	}
});

// Create Model
const Product = mongoose.model(
	modelNameArray.PRODUCT,
	ProductSchema
) as mongoose.Model<IProductDoc, {}>;
const ProductDescription = mongoose.model(
	modelNameArray.PRODUCT_DESCRIPTION,
	ProductDescriptionSchema
) as mongoose.Model<IProductDescriptionDoc, {}>;

// new Product({
// 	productModel: "Ford-GT",
// 	productImage: "fordgt.png",
// 	productPrice: 12000,
// 	productQuantity: 10,
// 	productStatus: true,
// 	productWeight: 1500
// })
// 	.save()
// 	.then((res) => {
// 		console.log(res);
// 	});

// new ProductDescription({
// 	productName: "Mustang",
// 	productOverview: "A car",
// 	productDescription: "A muscle car",
// 	productId: "5c30a67eff113e424495d749"
// })
// 	.save()
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch(console.error);

// Create Models namespace
namespace Models {
	export type baseModelDoc = mongoose.Model<
		IProductDoc | IProductDescriptionDoc,
		{}
	>;
	export type productModel = IProductDoc;
	export type productDescriptionModel = IProductDescriptionDoc;
}

export {modelNameArray, Product, ProductDescription, mongoose, Models};

export default {modelNameArray, Product, ProductDescription, mongoose};

"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
exports.mongoose = mongoose_1.default;
mongoose_1.default.connect("mongodb://localhost:27017/vsy", {
    useNewUrlParser: true,
    useCreateIndex: true
});
const db = mongoose_1.default.connection;
db.on("error", console.error);
db.on("open", () => {
    console.log("Mongoose connected to MongoDB server...");
});
const modelNameArray = {
    PRODUCT: "products",
    PRODUCT_DESCRIPTION: "product_descriptions"
};
exports.modelNameArray = modelNameArray;
const ProductSchema = new mongoose_1.Schema({
    productModel: String,
    productImage: String,
    productPrice: Number,
    productQuantity: Number,
    productStatus: Boolean,
    productWeight: Number,
    productDateAvailable: Number
}, {
    timestamps: true
});
const ProductDescriptionSchema = new mongoose_1.Schema({
    productName: String,
    productOverview: String,
    productDescription: String,
    productUrl: String,
    productViewed: Number,
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        validate: {
            isAsync: true,
            validator: (inputNodeId) => {
                return Product.findById(inputNodeId, "_id").then((foundProduct) => {
                    if (foundProduct) {
                        return ProductDescription.findOne({
                            productId: foundProduct._id
                        }, "_id")
                            .then((foundProductDescription) => {
                            if (foundProductDescription) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        })
                            .catch((err) => {
                            return false;
                        });
                    }
                    else {
                        return false;
                    }
                });
            }
        }
    }
});
const Product = mongoose_1.default.model(modelNameArray.PRODUCT, ProductSchema);
exports.Product = Product;
const ProductDescription = mongoose_1.default.model(modelNameArray.PRODUCT_DESCRIPTION, ProductDescriptionSchema);
exports.ProductDescription = ProductDescription;
exports.default = { modelNameArray, Product, ProductDescription, mongoose: mongoose_1.default };

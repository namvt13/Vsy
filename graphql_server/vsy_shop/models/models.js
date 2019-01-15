"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
const ShopSchema = new mongoose_1.default.Schema({
    shopName: String,
    shopImage: String
});
const ShopInfoSchema = new mongoose_1.default.Schema({
    shopAddress: String,
    shopUrl: String,
    urlClicked: Number,
    dateLastClick: Date,
    shopId: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: (inputShopId) => {
                console.log(inputShopId);
                return mongoose_1.default
                    .model("shops")
                    .find({}, "_id")
                    .then((shops) => {
                    const inputShop = shops.find((shop) => {
                        return shop._id.toString() === inputShopId;
                    });
                    if (inputShop) {
                        return mongoose_1.default
                            .model("shop_infos")
                            .find({}, "shopId")
                            .then((shop_infos) => {
                            const refShopInfo = shop_infos.find((shop_info) => {
                                return shop_info.shopId === inputShopId;
                            });
                            return refShopInfo ? false : true;
                        });
                    }
                    else {
                        return false;
                    }
                });
            }
        }
    }
}, {
    timestamps: true
});
const Shop = mongoose_1.default.model("shops", ShopSchema);
exports.Shop = Shop;
const ShopInfo = mongoose_1.default.model("shop_infos", ShopInfoSchema);
exports.ShopInfo = ShopInfo;

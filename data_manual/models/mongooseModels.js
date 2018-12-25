"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const currenciesSchema = new Schema({
    currencies_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    title: String,
    code: String,
    symbol_left: String,
    symbol_right: String
});
const sessionsSchema = new Schema({
    sess_key: {
        type: String,
        unique: true,
        auto: true
    },
    expiry: Number,
    value: String
});
const promotionsSchema = new Schema({
    promo_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    promo_title: String,
    promo_url: String,
    promo_image: String,
    promo_group: String,
    expires_impressions: Number,
    expires_date: Date,
    date_added: Date,
    date_status_change: Date,
    status: Boolean
});
const promotionHistorySchema = new Schema({
    promo_history_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    promo_id: mongoose_1.default.Types.ObjectId,
    promo_shown: Number,
    promo_clicked: Number,
    promo_history_date: Date
});
const orderStatusSchema = new Schema({
    orders_status_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    languages_id: mongoose_1.default.Types.ObjectId,
    orders_status_name: String
});
const countriesSchema = new Schema({
    countries_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    countries_name: String,
    countries_iso_code_2: String,
    address_format_id: mongoose_1.default.Types.ObjectId
});
const taxRatesSchema = new Schema({
    tax_rates_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    countries_id: mongoose_1.default.Types.ObjectId,
    tax_class_id: mongoose_1.default.Types.ObjectId,
    tax_priority: Number,
    tax_rate: mongoose_1.default.Types.Decimal128,
    tax_description: String,
    last_modified: Date,
    date_added: Date
});
const taxClassSchema = new Schema({
    tax_class_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    tax_class_title: String,
    tax_class_description: String,
    last_modified: Date,
    date_added: Date
});
const addressBookSchema = new Schema({
    customers_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true
    },
    address_book_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    entry_gender: Boolean,
    entry_company: String,
    entry_firstname: String,
    entry_lastname: String,
    entry_street_address: String,
    entry_postcode: String,
    entry_city: String,
    entry_state: String,
    entry_country_id: mongoose_1.default.Types.ObjectId
});
const customersSchema = new Schema({
    customers_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    customers_gender: Boolean,
    customers_firstname: String,
    customers_lastname: String,
    customers_dob: Date,
    customers_email_address: String,
    customers_default_address_id: mongoose_1.default.Types.ObjectId,
    customers_telephone: String,
    customers_password: String,
    customers_newsletter: Boolean
});
const whosOnlineSchema = new Schema({
    customers_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true
    },
    full_name: String,
    session_id: String,
    ip_address: String,
    time_entry: String,
    time_last_click: String,
    last_page_url: String
});
const customersBasketSchema = new Schema({
    customers_basket_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    customers_id: mongoose_1.default.Types.ObjectId,
    products_id: mongoose_1.default.Types.ObjectId,
    customers_basket_quantity: Number,
    final_price: mongoose_1.default.Types.Decimal128,
    customers_basket_date_added: String
});
const customersBasketAttributesSchema = new Schema({
    customers_basket_attributes_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    customers_id: mongoose_1.default.Types.ObjectId,
    products_id: mongoose_1.default.Types.ObjectId,
    products_options_id: mongoose_1.default.Types.ObjectId,
    products_options_values_id: mongoose_1.default.Types.ObjectId
});
const ordersSchema = new Schema({
    orders_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    customers_id: mongoose_1.default.Types.ObjectId,
    customers_name: String,
    customers_street_address: String,
    customers_city: String,
    customers_postcode: String,
    customers_state: String,
    customers_country: String,
    customers_telephone: String,
    customers_email_address: String,
    customers_address_format_id: mongoose_1.default.Types.ObjectId,
    delivery_name: String,
    delivery_street_address: String,
    delivery_city: String,
    delivery_postcode: String,
    delivery_state: String,
    delivery_country: String,
    delivery_address_format_id: mongoose_1.default.Types.ObjectId,
    payment_method: String,
    cc_type: String,
    cc_owner: String,
    cc_number: String,
    cc_expires: String,
    last_modified: Date,
    date_purchased: Date,
    shipping_cost: mongoose_1.default.Types.Decimal128,
    shipping_method: String,
    orders_status: String,
    orders_date_finished: Date,
    comments: String,
    currency: String,
    currency_value: mongoose_1.default.Types.Decimal128
});
const addressFormatSchema = new Schema({
    address_format_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    address_format: String,
    address_summary: String
});
const ordersProductsSchema = new Schema({
    orders_products_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    orders_id: mongoose_1.default.Types.ObjectId,
    products_id: mongoose_1.default.Types.ObjectId,
    products_name: String,
    products_price: mongoose_1.default.Types.Decimal128,
    final_price: mongoose_1.default.Types.Decimal128,
    products_tax: mongoose_1.default.Types.Decimal128,
    products_quantity: Number
});
const ordersProductsAttributesSchema = new Schema({
    orders_products_attributes_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    orders_id: mongoose_1.default.Types.ObjectId,
    orders_products_id: mongoose_1.default.Types.ObjectId,
    products_options: String,
    products_options_values: String,
    options_values_price: mongoose_1.default.Types.Decimal128,
    price_prefix: Boolean
});
const reviewsSchema = new Schema({
    reviews_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    products_id: mongoose_1.default.Types.ObjectId,
    customers_id: mongoose_1.default.Types.ObjectId,
    customers_name: String,
    reviews_rating: Number,
    date_added: Date,
    last_modified: Date,
    reviews_read: Number
});
const reviewsDescriptionSchema = new Schema({
    reivews_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true
    },
    languages_id: mongoose_1.default.Types.ObjectId,
    reviews_text: String
});
const languagesSchema = new Schema({
    languages_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    name: String,
    code: String,
    image: String,
    directory: String,
    sort_order: Number
});
const productsSchema = new Schema({
    products_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    products_quantity: Number,
    products_model: String,
    products_image: String,
    products_price: mongoose_1.default.Types.Decimal128,
    products_date_added: Date,
    products_last_modified: Date,
    products_date_available: Date,
    products_weight: mongoose_1.default.Types.Decimal128,
    products_status: Boolean,
    products_tax_class_id: mongoose_1.default.Types.ObjectId,
    shops_id: mongoose_1.default.Types.ObjectId
});
const productsAttributesSchema = new Schema({
    products_attributes_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    products_id: mongoose_1.default.Types.ObjectId,
    options_id: mongoose_1.default.Types.ObjectId,
    options_values_id: mongoose_1.default.Types.ObjectId,
    options_values_price: mongoose_1.default.Types.Decimal128,
    price_prefix: Boolean
});
const productsOptionsValuesSchema = new Schema({
    products_options_values_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    languages_id: mongoose_1.default.Types.ObjectId,
    products_options_values_name: String
});
const productsOptionsValuesToProductsOptionsSchema = new Schema({
    products_options_values_to_products_options_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    products_options_id: mongoose_1.default.Types.ObjectId,
    products_options_values_id: mongoose_1.default.Types.ObjectId
});
const productsOptionsSchema = new Schema({
    products_options_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    languages_id: mongoose_1.default.Types.ObjectId,
    products_options_name: String
});
const productsDescriptionSchema = new Schema({
    products_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true
    },
    languages_id: mongoose_1.default.Types.ObjectId,
    products_name: String,
    products_description: String,
    products_url: String,
    products_viewed: String
});
const categoriesSchema = new Schema({
    categories_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    categories_image: String,
    parent_categories_id: mongoose_1.default.Types.ObjectId,
    sort_order: Number,
    date_added: Date,
    last_modified: Date
});
const categoriesDescriptionSchema = new Schema({
    categories_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true
    },
    languages_id: mongoose_1.default.Types.ObjectId,
    categories_name: String
});
const productsToCategoriesSchema = new Schema({
    products_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true
    },
    categories_id: mongoose_1.default.Types.ObjectId
});
const shopsSchema = new Schema({
    shops_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    shops_name: String,
    shops_image: String
});
const shopsInfoSchema = new Schema({
    shops_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true
    },
    languages_id: mongoose_1.default.Types.ObjectId,
    shops_url: String,
    url_clicked: Number,
    date_last_click: Date,
    date_added: Date
});
const specialsSchema = new Schema({
    specials_id: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true,
        auto: true
    },
    products_id: mongoose_1.default.Types.ObjectId,
    specials_new_products_price: mongoose_1.default.Types.Decimal128,
    specials_date_added: Date,
    specials_last_modified: Date
});
const modelsObj = {
    Promotions: mongoose_1.default.model("Promotion", promotionsSchema),
    PromotionsHistory: mongoose_1.default.model("PromotionsHistory", promotionHistorySchema),
    Currencies: mongoose_1.default.model("Currencies", currenciesSchema),
    Sessions: mongoose_1.default.model("Sessions", sessionsSchema),
    AddressBook: mongoose_1.default.model("AddressBook", addressBookSchema),
    AddressFormat: mongoose_1.default.model("AddressFormat", addressFormatSchema),
    Countries: mongoose_1.default.model("Countries", countriesSchema),
    TaxRates: mongoose_1.default.model("TaxRates", taxRatesSchema),
    TaxClass: mongoose_1.default.model("TaxClass", taxClassSchema),
    Customers: mongoose_1.default.model("Customers", customersSchema),
    WhosOnline: mongoose_1.default.model("WhosOnline", whosOnlineSchema),
    CustomersBasket: mongoose_1.default.model("CustomersBasket", customersBasketSchema),
    CustomersBasketAttributes: mongoose_1.default.model("CustomersBasketAttributes", customersBasketAttributesSchema),
    Orders: mongoose_1.default.model("Orders", ordersSchema),
    OrdersProducts: mongoose_1.default.model("OrdersProducts", ordersProductsSchema),
    OrdersProductsAttributes: mongoose_1.default.model("OrdersProductsAttributes", ordersProductsAttributesSchema),
    Specials: mongoose_1.default.model("Specials", specialsSchema),
    Shops: mongoose_1.default.model("Shops", shopsSchema),
    ShopsInfo: mongoose_1.default.model("ShopsInfo", shopsInfoSchema),
    Reviews: mongoose_1.default.model("Reviews", reviewsSchema),
    ReviewsDescription: mongoose_1.default.model("ReviewsDescription", reviewsDescriptionSchema),
    Languages: mongoose_1.default.model("Languages", languagesSchema),
    OrdersStatus: mongoose_1.default.model("OrdersStatus", orderStatusSchema),
    Products: mongoose_1.default.model("Products", productsSchema),
    ProductsDescription: mongoose_1.default.model("ProductsDescription", productsDescriptionSchema),
    ProductsOptions: mongoose_1.default.model("ProductsOptions", productsOptionsSchema),
    ProductsOptionsValuesToProductsOptions: mongoose_1.default.model("ProductsOptionsValuesToProductsOptions", productsOptionsValuesToProductsOptionsSchema),
    ProductsOptionsValues: mongoose_1.default.model("ProductsOptionsValues", productsOptionsValuesSchema),
    ProductsAttributes: mongoose_1.default.model("ProductsAttributes", productsAttributesSchema),
    Categories: mongoose_1.default.model("Categories", categoriesSchema),
    CategoriesDescription: mongoose_1.default.model("CategoriesDescription", categoriesDescriptionSchema),
    ProductsToCategories: mongoose_1.default.model("ProductsToCategories", productsToCategoriesSchema)
};
exports.default = modelsObj;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const currenciesSchema = new Schema({
	currencies_id: {
		type: mongoose.Types.ObjectId,
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
		type: mongoose.Types.ObjectId,
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
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	promo_id: mongoose.Types.ObjectId,
	promo_shown: Number,
	promo_clicked: Number,
	promo_history_date: Date
});

const orderStatusSchema = new Schema({
	orders_status_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	languages_id: mongoose.Types.ObjectId,
	orders_status_name: String
});

const countriesSchema = new Schema({
	countries_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	countries_name: String,
	countries_iso_code_2: String,
	address_format_id: mongoose.Types.ObjectId
});

///

const taxRatesSchema = new Schema({
	tax_rates_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	countries_id: mongoose.Types.ObjectId,
	tax_class_id: mongoose.Types.ObjectId,
	tax_priority: Number,
	tax_rate: mongoose.Types.Decimal128,
	tax_description: String,
	last_modified: Date,
	date_added: Date
});

const taxClassSchema = new Schema({
	tax_class_id: {
		type: mongoose.Types.ObjectId,
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
		type: mongoose.Types.ObjectId,
		unique: true
	},
	address_book_id: {
		type: mongoose.Types.ObjectId,
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
	entry_country_id: mongoose.Types.ObjectId
});

const customersSchema = new Schema({
	customers_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	customers_gender: Boolean,
	customers_firstname: String,
	customers_lastname: String,
	customers_dob: Date,
	customers_email_address: String,
	customers_default_address_id: mongoose.Types.ObjectId,
	customers_telephone: String,
	customers_password: String,
	customers_newsletter: Boolean
});

const whosOnlineSchema = new Schema({
	customers_id: {
		type: mongoose.Types.ObjectId,
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
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	customers_id: mongoose.Types.ObjectId,
	products_id: mongoose.Types.ObjectId,
	customers_basket_quantity: Number,
	final_price: mongoose.Types.Decimal128,
	customers_basket_date_added: String
});

const customersBasketAttributesSchema = new Schema({
	customers_basket_attributes_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	customers_id: mongoose.Types.ObjectId,
	products_id: mongoose.Types.ObjectId,
	products_options_id: mongoose.Types.ObjectId,
	products_options_values_id: mongoose.Types.ObjectId
});

const ordersSchema = new Schema({
	orders_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	customers_id: mongoose.Types.ObjectId,
	customers_name: String,
	customers_street_address: String,
	customers_city: String,
	customers_postcode: String,
	customers_state: String,
	customers_country: String,
	customers_telephone: String,
	customers_email_address: String,
	customers_address_format_id: mongoose.Types.ObjectId,
	delivery_name: String,
	delivery_street_address: String,
	delivery_city: String,
	delivery_postcode: String,
	delivery_state: String,
	delivery_country: String,
	delivery_address_format_id: mongoose.Types.ObjectId,
	payment_method: String,
	cc_type: String,
	cc_owner: String,
	cc_number: String,
	cc_expires: String,
	last_modified: Date,
	date_purchased: Date,
	shipping_cost: mongoose.Types.Decimal128,
	shipping_method: String,
	orders_status: String,
	orders_date_finished: Date,
	comments: String,
	currency: String,
	currency_value: mongoose.Types.Decimal128
});

const addressFormatSchema = new Schema({
	address_format_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	address_format: String,
	address_summary: String
});

const ordersProductsSchema = new Schema({
	orders_products_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	orders_id: mongoose.Types.ObjectId,
	products_id: mongoose.Types.ObjectId,
	products_name: String,
	products_price: mongoose.Types.Decimal128,
	final_price: mongoose.Types.Decimal128,
	products_tax: mongoose.Types.Decimal128,
	products_quantity: Number
});

const ordersProductsAttributesSchema = new Schema({
	orders_products_attributes_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	orders_id: mongoose.Types.ObjectId,
	orders_products_id: mongoose.Types.ObjectId,
	products_options: String,
	products_options_values: String,
	options_values_price: mongoose.Types.Decimal128,
	price_prefix: Boolean
});

const reviewsSchema = new Schema({
	reviews_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	products_id: mongoose.Types.ObjectId,
	customers_id: mongoose.Types.ObjectId,
	customers_name: String,
	reviews_rating: Number,
	date_added: Date,
	last_modified: Date,
	reviews_read: Number
});

const reviewsDescriptionSchema = new Schema({
	reivews_id: {
		type: mongoose.Types.ObjectId,
		unique: true
	},
	languages_id: mongoose.Types.ObjectId,
	reviews_text: String
});

const languagesSchema = new Schema({
	languages_id: {
		type: mongoose.Types.ObjectId,
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
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	products_quantity: Number,
	products_model: String,
	products_image: String,
	products_price: mongoose.Types.Decimal128,
	products_date_added: Date,
	products_last_modified: Date,
	products_date_available: Date,
	products_weight: mongoose.Types.Decimal128,
	products_status: Boolean,
	products_tax_class_id: mongoose.Types.ObjectId,
	shops_id: mongoose.Types.ObjectId
});

const productsAttributesSchema = new Schema({
	products_attributes_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	products_id: mongoose.Types.ObjectId,
	options_id: mongoose.Types.ObjectId,
	options_values_id: mongoose.Types.ObjectId,
	options_values_price: mongoose.Types.Decimal128,
	price_prefix: Boolean
});

const productsOptionsValuesSchema = new Schema({
	products_options_values_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	languages_id: mongoose.Types.ObjectId,
	products_options_values_name: String
});

const productsOptionsValuesToProductsOptionsSchema = new Schema({
	products_options_values_to_products_options_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	products_options_id: mongoose.Types.ObjectId,
	products_options_values_id: mongoose.Types.ObjectId
});

const productsOptionsSchema = new Schema({
	products_options_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	languages_id: mongoose.Types.ObjectId,
	products_options_name: String
});

const productsDescriptionSchema = new Schema({
	products_id: {
		type: mongoose.Types.ObjectId,
		unique: true
	},
	languages_id: mongoose.Types.ObjectId,
	products_name: String,
	products_description: String,
	products_url: String,
	products_viewed: String
});

const categoriesSchema = new Schema({
	categories_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	categories_image: String,
	parent_categories_id: mongoose.Types.ObjectId,
	sort_order: Number,
	date_added: Date,
	last_modified: Date
});

const categoriesDescriptionSchema = new Schema({
	categories_id: {
		type: mongoose.Types.ObjectId,
		unique: true
	},
	languages_id: mongoose.Types.ObjectId,
	categories_name: String
});

const productsToCategoriesSchema = new Schema({
	products_id: {
		type: mongoose.Types.ObjectId,
		unique: true
	},
	categories_id: mongoose.Types.ObjectId
});

const shopsSchema = new Schema({
	shops_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	shops_name: String,
	shops_image: String
});

const shopsInfoSchema = new Schema({
	shops_id: {
		type: mongoose.Types.ObjectId,
		unique: true
	},
	languages_id: mongoose.Types.ObjectId,
	shops_url: String,
	url_clicked: Number,
	date_last_click: Date,
	date_added: Date
});

const specialsSchema = new Schema({
	specials_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		auto: true
	},
	products_id: mongoose.Types.ObjectId,
	specials_new_products_price: mongoose.Types.Decimal128,
	specials_date_added: Date,
	specials_last_modified: Date
});

const modelsObj = {
	Promotions: mongoose.model("Promotion", promotionsSchema),
	PromotionsHistory: mongoose.model(
		"PromotionsHistory",
		promotionHistorySchema
	),
	Currencies: mongoose.model("Currencies", currenciesSchema),
	Sessions: mongoose.model("Sessions", sessionsSchema),
	AddressBook: mongoose.model("AddressBook", addressBookSchema),
	AddressFormat: mongoose.model("AddressFormat", addressFormatSchema),
	Countries: mongoose.model("Countries", countriesSchema),
	TaxRates: mongoose.model("TaxRates", taxRatesSchema),
	TaxClass: mongoose.model("TaxClass", taxClassSchema),
	Customers: mongoose.model("Customers", customersSchema),
	WhosOnline: mongoose.model("WhosOnline", whosOnlineSchema),
	CustomersBasket: mongoose.model("CustomersBasket", customersBasketSchema),
	CustomersBasketAttributes: mongoose.model(
		"CustomersBasketAttributes",
		customersBasketAttributesSchema
	),
	Orders: mongoose.model("Orders", ordersSchema),
	OrdersProducts: mongoose.model("OrdersProducts", ordersProductsSchema),
	OrdersProductsAttributes: mongoose.model(
		"OrdersProductsAttributes",
		ordersProductsAttributesSchema
	),
	Specials: mongoose.model("Specials", specialsSchema),
	Shops: mongoose.model("Shops", shopsSchema),
	ShopsInfo: mongoose.model("ShopsInfo", shopsInfoSchema),
	Reviews: mongoose.model("Reviews", reviewsSchema),
	ReviewsDescription: mongoose.model(
		"ReviewsDescription",
		reviewsDescriptionSchema
	),
	Languages: mongoose.model("Languages", languagesSchema),
	OrdersStatus: mongoose.model("OrdersStatus", orderStatusSchema),
	Products: mongoose.model("Products", productsSchema),
	ProductsDescription: mongoose.model(
		"ProductsDescription",
		productsDescriptionSchema
	),
	ProductsOptions: mongoose.model("ProductsOptions", productsOptionsSchema),
	ProductsOptionsValuesToProductsOptions: mongoose.model(
		"ProductsOptionsValuesToProductsOptions",
		productsOptionsValuesToProductsOptionsSchema
	),
	ProductsOptionsValues: mongoose.model(
		"ProductsOptionsValues",
		productsOptionsValuesSchema
	),
	ProductsAttributes: mongoose.model(
		"ProductsAttributes",
		productsAttributesSchema
	),
	Categories: mongoose.model("Categories", categoriesSchema),
	CategoriesDescription: mongoose.model(
		"CategoriesDescription",
		categoriesDescriptionSchema
	),
	ProductsToCategories: mongoose.model(
		"ProductsToCategories",
		productsToCategoriesSchema
	)
};

export default modelsObj;

import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} from "graphql";
// import fs from "fs";
// import models from "../models/mongooseModels";

// fs.writeFileSync(
// 	"./keys",
// 	Object.keys(models)
// 		.map((key) => {
// 			return (
// 				"const " +
// 				key[0].toLocaleLowerCase() +
// 				key.slice(1) +
// 				`Type = new GraphQLObjectType({
//         name: "${key}",
//         fields: {}
//       });`
// 			);
// 		})
// 		.join("\n")
// );

const promotionsType = new GraphQLObjectType({
	name: "Promotions",
	fields: {
		promo_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		promo_title: {
			type: GraphQLString
		},
		promo_url: {
			type: GraphQLString
		},
		promo_image: {
			type: GraphQLString
		},
		promo_group: {
			type: GraphQLString
		},
		expires_impressions: {
			type: GraphQLInt
		},
		expires_date: {
			type: GraphQLString
		},
		date_added: {
			type: GraphQLString
		},
		date_status_change: {
			type: GraphQLString
		},
		status: {
			type: GraphQLBoolean
		}
	}
});
const promotionsHistoryType = new GraphQLObjectType({
	name: "PromotionsHistory",
	fields: {
		promo_history_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		promo_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		promo_shown: {
			type: GraphQLInt
		},
		promo_clicked: {
			type: GraphQLInt
		},
		promo_history_date: {
			type: GraphQLString
		}
	}
});
const currenciesType = new GraphQLObjectType({
	name: "Currencies",
	fields: {
		currencies_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		title: {
			type: GraphQLString
		},
		code: {
			type: GraphQLString
		},
		symbol_left: {
			type: GraphQLString
		},
		symbol_right: {
			type: GraphQLString
		}
	}
});
const sessionsType = new GraphQLObjectType({
	name: "Sessions",
	fields: {
		sess_key: {
			type: new GraphQLNonNull(GraphQLString)
		},
		expiry: {
			type: GraphQLInt
		},
		value: {
			type: GraphQLString
		}
	}
});
const addressBookType = new GraphQLObjectType({
	name: "AddressBook",
	fields: {
		customers_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		address_book_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		entry_gender: {
			type: GraphQLBoolean
		},
		entry_company: {
			type: GraphQLString
		},
		entry_firstname: {
			type: GraphQLString
		},
		entry_lastname: {
			type: GraphQLString
		},
		entry_street_address: {
			type: GraphQLString
		},
		entry_postcode: {
			type: GraphQLString
		},
		entry_city: {
			type: GraphQLString
		},
		entry_state: {
			type: GraphQLString
		},
		entry_country_id: {
			type: new GraphQLNonNull(GraphQLID)
		}
	}
});
const addressFormatType = new GraphQLObjectType({
	name: "AddressFormat",
	fields: {
		address_format_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		address_format: {
			type: GraphQLString
		},
		address_summary: {
			type: GraphQLString
		}
	}
});
const countriesType = new GraphQLObjectType({
	name: "Countries",
	fields: {
		countries_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		countries_name: {
			type: GraphQLString
		},
		countries_iso_code_2: {
			type: GraphQLString
		},
		address_format_id: {
			type: new GraphQLNonNull(GraphQLID)
		}
	}
});
const taxRatesType = new GraphQLObjectType({
	name: "TaxRates",
	fields: {
		tax_rates_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		countries_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		tax_class_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		tax_priority: {
			type: GraphQLInt
		},
		tax_rate: {
			type: GraphQLFloat
		},
		tax_description: {
			type: GraphQLString
		},
		last_modified: {
			type: GraphQLString
		},
		date_added: {
			type: GraphQLString
		}
	}
});
const taxClassType = new GraphQLObjectType({
	name: "TaxClass",
	fields: {
		tax_class_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		tax_class_title: {
			type: GraphQLString
		},
		tax_class_description: {
			type: GraphQLString
		},
		last_modified: {
			type: GraphQLString
		},
		date_added: {
			type: GraphQLString
		}
	}
});
const customersType = new GraphQLObjectType({
	name: "Customers",
	fields: {
		customers_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		customers_gender: {
			type: GraphQLBoolean
		},
		customers_firstname: {
			type: GraphQLString
		},
		customers_lastname: {
			type: GraphQLString
		},
		customers_dob: {
			type: GraphQLString
		},
		customers_email_address: {
			type: GraphQLString
		},
		customers_default_address_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		customers_telephone: {
			type: GraphQLString
		},
		customers_password: {
			type: GraphQLString
		},
		customers_newsletter: {
			type: GraphQLBoolean
		}
	}
});
const whosOnlineType = new GraphQLObjectType({
	name: "WhosOnline",
	fields: {
		customers_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		full_name: {
			type: GraphQLString
		},
		session_id: {
			type: GraphQLString
		},
		ip_address: {
			type: GraphQLString
		},
		time_entry: {
			type: GraphQLString
		},
		time_last_click: {
			type: GraphQLString
		},
		last_page_url: {
			type: GraphQLString
		}
	}
});
const customersBasketType = new GraphQLObjectType({
	name: "CustomersBasket",
	fields: {
		customers_basket_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		customers_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		customers_basket_quantity: {
			type: GraphQLInt
		},
		final_price: {
			type: GraphQLFloat
		},
		customers_basket_date_added: {
			type: GraphQLString
		}
	}
});
const customersBasketAttributesType = new GraphQLObjectType({
	name: "CustomersBasketAttributes",
	fields: {
		customers_basket_attributes_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		customers_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_options_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_options_values_id: {
			type: new GraphQLNonNull(GraphQLID)
		}
	}
});
const ordersType = new GraphQLObjectType({
	name: "Orders",
	fields: {
		orders_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		customers_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		customers_name: {
			type: GraphQLString
		},
		customers_street_address: {
			type: GraphQLString
		},
		customers_city: {
			type: GraphQLString
		},
		customers_postcode: {
			type: GraphQLString
		},
		customers_state: {
			type: GraphQLString
		},
		customers_country: {
			type: GraphQLString
		},
		customers_telephone: {
			type: GraphQLString
		},
		customers_email_address: {
			type: GraphQLString
		},
		customers_address_format_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		delivery_name: {
			type: GraphQLString
		},
		delivery_street_address: {
			type: GraphQLString
		},
		delivery_city: {
			type: GraphQLString
		},
		delivery_postcode: {
			type: GraphQLString
		},
		delivery_state: {
			type: GraphQLString
		},
		delivery_country: {
			type: GraphQLString
		},
		delivery_address_format_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		payment_method: {
			type: GraphQLString
		},
		cc_type: {
			type: GraphQLString
		},
		cc_owner: {
			type: GraphQLString
		},
		cc_number: {
			type: GraphQLString
		},
		cc_expires: {
			type: GraphQLString
		},
		last_modified: {
			type: GraphQLString
		},
		date_purchased: {
			type: GraphQLString
		},
		shipping_cost: {
			type: GraphQLFloat
		},
		shipping_method: {
			type: GraphQLString
		},
		orders_status: {
			type: GraphQLString
		},
		orders_date_finished: {
			type: GraphQLString
		},
		comments: {
			type: GraphQLString
		},
		currency: {
			type: GraphQLString
		},
		currency_value: {
			type: GraphQLFloat
		}
	}
});
const ordersProductsType = new GraphQLObjectType({
	name: "OrdersProducts",
	fields: {
		orders_products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		orders_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_name: {
			type: GraphQLString
		},
		products_price: {
			type: GraphQLFloat
		},
		final_price: {
			type: GraphQLFloat
		},
		products_tax: {
			type: GraphQLFloat
		},
		products_quantity: {
			type: GraphQLInt
		}
	}
});
const ordersProductsAttributesType = new GraphQLObjectType({
	name: "OrdersProductsAttributes",
	fields: {
		orders_products_attributes_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		orders_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		orders_products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_options: {
			type: GraphQLString
		},
		products_options_values: {
			type: GraphQLString
		},
		options_values_price: {
			type: GraphQLFloat
		},
		price_prefix: {
			type: GraphQLBoolean
		}
	}
});
const specialsType = new GraphQLObjectType({
	name: "Specials",
	fields: {
		specials_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		specials_new_products_price: {
			type: GraphQLFloat
		},
		specials_date_added: {
			type: GraphQLString
		},
		specials_last_modified: {
			type: GraphQLString
		}
	}
});
const shopsType = new GraphQLObjectType({
	name: "Shops",
	fields: {
		shops_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		shops_name: {
			type: GraphQLString
		},
		shops_image: {
			type: GraphQLString
		}
	}
});
const shopsInfoType = new GraphQLObjectType({
	name: "ShopsInfo",
	fields: {
		shops_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		languages_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		shops_url: {
			type: GraphQLString
		},
		url_clicked: {
			type: GraphQLInt
		},
		date_last_click: {
			type: GraphQLString
		},
		date_added: {
			type: GraphQLString
		}
	}
});
const reviewsType = new GraphQLObjectType({
	name: "Reviews",
	fields: {
		reviews_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		customers_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		customers_name: {
			type: GraphQLString
		},
		reviews_rating: {
			type: GraphQLInt
		},
		date_added: {
			type: GraphQLString
		},
		last_modified: {
			type: GraphQLString
		},
		reviews_read: {
			type: GraphQLInt
		}
	}
});
const reviewsDescriptionType = new GraphQLObjectType({
	name: "ReviewsDescription",
	fields: {
		reivews_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		languages_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		reviews_text: {
			type: GraphQLString
		}
	}
});
const languagesType = new GraphQLObjectType({
	name: "Languages",
	fields: {
		languages_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		name: {
			type: GraphQLString
		},
		code: {
			type: GraphQLString
		},
		image: {
			type: GraphQLString
		},
		directory: {
			type: GraphQLString
		},
		sort_order: {
			type: GraphQLInt
		}
	}
});
const ordersStatusType = new GraphQLObjectType({
	name: "OrdersStatus",
	fields: {
		orders_status_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		languages_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		orders_status_name: {
			type: GraphQLString
		}
	}
});
const productsType = new GraphQLObjectType({
	name: "Products",
	fields: {
		products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_quantity: {
			type: GraphQLInt
		},
		products_model: {
			type: GraphQLString
		},
		products_image: {
			type: GraphQLString
		},
		products_price: {
			type: GraphQLFloat
		},
		products_date_added: {
			type: GraphQLString
		},
		products_last_modified: {
			type: GraphQLString
		},
		products_date_available: {
			type: GraphQLString
		},
		products_weight: {
			type: GraphQLFloat
		},
		products_status: {
			type: GraphQLBoolean
		},
		products_tax_class_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		shops_id: {
			type: new GraphQLNonNull(GraphQLID)
		}
	}
});
const productsDescriptionType = new GraphQLObjectType({
	name: "ProductsDescription",
	fields: {
		products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		languages_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_name: {
			type: GraphQLString
		},
		products_description: {
			type: GraphQLString
		},
		products_url: {
			type: GraphQLString
		},
		products_viewed: {
			type: GraphQLString
		}
	}
});
const productsOptionsType = new GraphQLObjectType({
	name: "ProductsOptions",
	fields: {
		products_options_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		languages_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_options_name: {
			type: GraphQLString
		}
	}
});
const productsOptionsValuesToProductsOptionsType = new GraphQLObjectType({
	name: "ProductsOptionsValuesToProductsOptions",
	fields: {
		products_options_values_to_products_options_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_options_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_options_values_id: {
			type: new GraphQLNonNull(GraphQLID)
		}
	}
});
const productsOptionsValuesType = new GraphQLObjectType({
	name: "ProductsOptionsValues",
	fields: {
		products_options_values_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		languages_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_options_values_name: {
			type: GraphQLString
		}
	}
});
const productsAttributesType = new GraphQLObjectType({
	name: "ProductsAttributes",
	fields: {
		products_attributes_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		options_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		options_values_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		options_values_price: {
			type: GraphQLFloat
		},
		price_prefix: {
			type: GraphQLBoolean
		}
	}
});
const categoriesType = new GraphQLObjectType({
	name: "Categories",
	fields: {
		categories_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		categories_image: {
			type: GraphQLString
		},
		parent_categories_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		sort_order: {
			type: GraphQLInt
		},
		date_added: {
			type: GraphQLString
		},
		last_modified: {
			type: GraphQLString
		}
	}
});
const categoriesDescriptionType = new GraphQLObjectType({
	name: "CategoriesDescription",
	fields: {
		categories_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		languages_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		categories_name: {
			type: GraphQLString
		}
	}
});
const productsToCategoriesType = new GraphQLObjectType({
	name: "ProductsToCategories",
	fields: {
		products_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		categories_id: {
			type: new GraphQLNonNull(GraphQLID)
		}
	}
});

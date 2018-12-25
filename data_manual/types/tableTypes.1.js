"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const promotionsInputType = new graphql_1.GraphQLInputObjectType({
    name: "PromotionsType",
    fields: {
        promo_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        promo_title: {
            type: graphql_1.GraphQLString
        },
        promo_url: {
            type: graphql_1.GraphQLString
        },
        promo_image: {
            type: graphql_1.GraphQLString
        },
        promo_group: {
            type: graphql_1.GraphQLString
        },
        expires_impressions: {
            type: graphql_1.GraphQLInt
        },
        expires_date: {
            type: graphql_1.GraphQLString
        },
        date_added: {
            type: graphql_1.GraphQLString
        },
        date_status_change: {
            type: graphql_1.GraphQLString
        },
        status: {
            type: graphql_1.GraphQLBoolean
        }
    }
});
const promotionsHistoryInputType = new graphql_1.GraphQLInputObjectType({
    name: "PromotionsHistoryType",
    fields: {
        promo_history_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        promo_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        promo_shown: {
            type: graphql_1.GraphQLInt
        },
        promo_clicked: {
            type: graphql_1.GraphQLInt
        },
        promo_history_date: {
            type: graphql_1.GraphQLString
        }
    }
});
const currenciesInputType = new graphql_1.GraphQLInputObjectType({
    name: "CurrenciesType",
    fields: {
        currencies_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        title: {
            type: graphql_1.GraphQLString
        },
        code: {
            type: graphql_1.GraphQLString
        },
        symbol_left: {
            type: graphql_1.GraphQLString
        },
        symbol_right: {
            type: graphql_1.GraphQLString
        }
    }
});
const sessionsInputType = new graphql_1.GraphQLInputObjectType({
    name: "SessionsType",
    fields: {
        sess_key: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        expiry: {
            type: graphql_1.GraphQLInt
        },
        value: {
            type: graphql_1.GraphQLString
        }
    }
});
const addressBookInputType = new graphql_1.GraphQLInputObjectType({
    name: "AddressBookType",
    fields: {
        customers_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        address_book_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        entry_gender: {
            type: graphql_1.GraphQLBoolean
        },
        entry_company: {
            type: graphql_1.GraphQLString
        },
        entry_firstname: {
            type: graphql_1.GraphQLString
        },
        entry_lastname: {
            type: graphql_1.GraphQLString
        },
        entry_street_address: {
            type: graphql_1.GraphQLString
        },
        entry_postcode: {
            type: graphql_1.GraphQLString
        },
        entry_city: {
            type: graphql_1.GraphQLString
        },
        entry_state: {
            type: graphql_1.GraphQLString
        },
        entry_country_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        }
    }
});
const addressFormatInputType = new graphql_1.GraphQLInputObjectType({
    name: "AddressFormatType",
    fields: {
        address_format_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        address_format: {
            type: graphql_1.GraphQLString
        },
        address_summary: {
            type: graphql_1.GraphQLString
        }
    }
});
const countriesInputType = new graphql_1.GraphQLInputObjectType({
    name: "CountriesType",
    fields: {
        countries_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        countries_name: {
            type: graphql_1.GraphQLString
        },
        countries_iso_code_2: {
            type: graphql_1.GraphQLString
        },
        address_format_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        }
    }
});
const taxRatesInputType = new graphql_1.GraphQLInputObjectType({
    name: "TaxRatesType",
    fields: {
        tax_rates_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        countries_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        tax_class_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        tax_priority: {
            type: graphql_1.GraphQLInt
        },
        tax_rate: {
            type: graphql_1.GraphQLFloat
        },
        tax_description: {
            type: graphql_1.GraphQLString
        },
        last_modified: {
            type: graphql_1.GraphQLString
        },
        date_added: {
            type: graphql_1.GraphQLString
        }
    }
});
const taxClassInputType = new graphql_1.GraphQLInputObjectType({
    name: "TaxClassType",
    fields: {
        tax_class_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        tax_class_title: {
            type: graphql_1.GraphQLString
        },
        tax_class_description: {
            type: graphql_1.GraphQLString
        },
        last_modified: {
            type: graphql_1.GraphQLString
        },
        date_added: {
            type: graphql_1.GraphQLString
        }
    }
});
const customersInputType = new graphql_1.GraphQLInputObjectType({
    name: "CustomersType",
    fields: {
        customers_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        customers_gender: {
            type: graphql_1.GraphQLBoolean
        },
        customers_firstname: {
            type: graphql_1.GraphQLString
        },
        customers_lastname: {
            type: graphql_1.GraphQLString
        },
        customers_dob: {
            type: graphql_1.GraphQLString
        },
        customers_email_address: {
            type: graphql_1.GraphQLString
        },
        customers_default_address_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        customers_telephone: {
            type: graphql_1.GraphQLString
        },
        customers_password: {
            type: graphql_1.GraphQLString
        },
        customers_newsletter: {
            type: graphql_1.GraphQLBoolean
        }
    }
});
const whosOnlineInputType = new graphql_1.GraphQLInputObjectType({
    name: "WhosOnlineType",
    fields: {
        customers_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        full_name: {
            type: graphql_1.GraphQLString
        },
        session_id: {
            type: graphql_1.GraphQLString
        },
        ip_address: {
            type: graphql_1.GraphQLString
        },
        time_entry: {
            type: graphql_1.GraphQLString
        },
        time_last_click: {
            type: graphql_1.GraphQLString
        },
        last_page_url: {
            type: graphql_1.GraphQLString
        }
    }
});
const customersBasketInputType = new graphql_1.GraphQLInputObjectType({
    name: "CustomersBasketType",
    fields: {
        customers_basket_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        customers_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        customers_basket_quantity: {
            type: graphql_1.GraphQLInt
        },
        final_price: {
            type: graphql_1.GraphQLFloat
        },
        customers_basket_date_added: {
            type: graphql_1.GraphQLString
        }
    }
});
const customersBasketAttributesInputType = new graphql_1.GraphQLInputObjectType({
    name: "CustomersBasketAttributesType",
    fields: {
        customers_basket_attributes_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        customers_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_options_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_options_values_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        }
    }
});
const ordersInputType = new graphql_1.GraphQLInputObjectType({
    name: "OrdersType",
    fields: {
        orders_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        customers_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        customers_name: {
            type: graphql_1.GraphQLString
        },
        customers_street_address: {
            type: graphql_1.GraphQLString
        },
        customers_city: {
            type: graphql_1.GraphQLString
        },
        customers_postcode: {
            type: graphql_1.GraphQLString
        },
        customers_state: {
            type: graphql_1.GraphQLString
        },
        customers_country: {
            type: graphql_1.GraphQLString
        },
        customers_telephone: {
            type: graphql_1.GraphQLString
        },
        customers_email_address: {
            type: graphql_1.GraphQLString
        },
        customers_address_format_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        delivery_name: {
            type: graphql_1.GraphQLString
        },
        delivery_street_address: {
            type: graphql_1.GraphQLString
        },
        delivery_city: {
            type: graphql_1.GraphQLString
        },
        delivery_postcode: {
            type: graphql_1.GraphQLString
        },
        delivery_state: {
            type: graphql_1.GraphQLString
        },
        delivery_country: {
            type: graphql_1.GraphQLString
        },
        delivery_address_format_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        payment_method: {
            type: graphql_1.GraphQLString
        },
        cc_type: {
            type: graphql_1.GraphQLString
        },
        cc_owner: {
            type: graphql_1.GraphQLString
        },
        cc_number: {
            type: graphql_1.GraphQLString
        },
        cc_expires: {
            type: graphql_1.GraphQLString
        },
        last_modified: {
            type: graphql_1.GraphQLString
        },
        date_purchased: {
            type: graphql_1.GraphQLString
        },
        shipping_cost: {
            type: graphql_1.GraphQLFloat
        },
        shipping_method: {
            type: graphql_1.GraphQLString
        },
        orders_status: {
            type: graphql_1.GraphQLString
        },
        orders_date_finished: {
            type: graphql_1.GraphQLString
        },
        comments: {
            type: graphql_1.GraphQLString
        },
        currency: {
            type: graphql_1.GraphQLString
        },
        currency_value: {
            type: graphql_1.GraphQLFloat
        }
    }
});
const ordersProductsInputType = new graphql_1.GraphQLInputObjectType({
    name: "OrdersProductsType",
    fields: {
        orders_products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        orders_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_name: {
            type: graphql_1.GraphQLString
        },
        products_price: {
            type: graphql_1.GraphQLFloat
        },
        final_price: {
            type: graphql_1.GraphQLFloat
        },
        products_tax: {
            type: graphql_1.GraphQLFloat
        },
        products_quantity: {
            type: graphql_1.GraphQLInt
        }
    }
});
const ordersProductsAttributesInputType = new graphql_1.GraphQLInputObjectType({
    name: "OrdersProductsAttributesType",
    fields: {
        orders_products_attributes_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        orders_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        orders_products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_options: {
            type: graphql_1.GraphQLString
        },
        products_options_values: {
            type: graphql_1.GraphQLString
        },
        options_values_price: {
            type: graphql_1.GraphQLFloat
        },
        price_prefix: {
            type: graphql_1.GraphQLBoolean
        }
    }
});
const specialsInputType = new graphql_1.GraphQLInputObjectType({
    name: "SpecialsType",
    fields: {
        specials_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        specials_new_products_price: {
            type: graphql_1.GraphQLFloat
        },
        specials_date_added: {
            type: graphql_1.GraphQLString
        },
        specials_last_modified: {
            type: graphql_1.GraphQLString
        }
    }
});
const shopsInputType = new graphql_1.GraphQLInputObjectType({
    name: "ShopsType",
    fields: {
        shops_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        shops_name: {
            type: graphql_1.GraphQLString
        },
        shops_image: {
            type: graphql_1.GraphQLString
        }
    }
});
const shopsInfoInputType = new graphql_1.GraphQLInputObjectType({
    name: "ShopsInfoType",
    fields: {
        shops_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        languages_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        shops_url: {
            type: graphql_1.GraphQLString
        },
        url_clicked: {
            type: graphql_1.GraphQLInt
        },
        date_last_click: {
            type: graphql_1.GraphQLString
        },
        date_added: {
            type: graphql_1.GraphQLString
        }
    }
});
const reviewsInputType = new graphql_1.GraphQLInputObjectType({
    name: "ReviewsType",
    fields: {
        reviews_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        customers_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        customers_name: {
            type: graphql_1.GraphQLString
        },
        reviews_rating: {
            type: graphql_1.GraphQLInt
        },
        date_added: {
            type: graphql_1.GraphQLString
        },
        last_modified: {
            type: graphql_1.GraphQLString
        },
        reviews_read: {
            type: graphql_1.GraphQLInt
        }
    }
});
const reviewsDescriptionInputType = new graphql_1.GraphQLInputObjectType({
    name: "ReviewsDescriptionType",
    fields: {
        reivews_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        languages_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        reviews_text: {
            type: graphql_1.GraphQLString
        }
    }
});
const languagesInputType = new graphql_1.GraphQLInputObjectType({
    name: "LanguagesType",
    fields: {
        languages_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        name: {
            type: graphql_1.GraphQLString
        },
        code: {
            type: graphql_1.GraphQLString
        },
        image: {
            type: graphql_1.GraphQLString
        },
        directory: {
            type: graphql_1.GraphQLString
        },
        sort_order: {
            type: graphql_1.GraphQLInt
        }
    }
});
const ordersStatusInputType = new graphql_1.GraphQLInputObjectType({
    name: "OrdersStatusType",
    fields: {
        orders_status_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        languages_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        orders_status_name: {
            type: graphql_1.GraphQLString
        }
    }
});
const productsInputType = new graphql_1.GraphQLInputObjectType({
    name: "ProductsType",
    fields: {
        products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_quantity: {
            type: graphql_1.GraphQLInt
        },
        products_model: {
            type: graphql_1.GraphQLString
        },
        products_image: {
            type: graphql_1.GraphQLString
        },
        products_price: {
            type: graphql_1.GraphQLFloat
        },
        products_date_added: {
            type: graphql_1.GraphQLString
        },
        products_last_modified: {
            type: graphql_1.GraphQLString
        },
        products_date_available: {
            type: graphql_1.GraphQLString
        },
        products_weight: {
            type: graphql_1.GraphQLFloat
        },
        products_status: {
            type: graphql_1.GraphQLBoolean
        },
        products_tax_class_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        shops_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        }
    }
});
const productsDescriptionInputType = new graphql_1.GraphQLInputObjectType({
    name: "ProductsDescriptionType",
    fields: {
        products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        languages_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_name: {
            type: graphql_1.GraphQLString
        },
        products_description: {
            type: graphql_1.GraphQLString
        },
        products_url: {
            type: graphql_1.GraphQLString
        },
        products_viewed: {
            type: graphql_1.GraphQLString
        }
    }
});
const productsOptionsInputType = new graphql_1.GraphQLInputObjectType({
    name: "ProductsOptionsType",
    fields: {
        products_options_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        languages_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_options_name: {
            type: graphql_1.GraphQLString
        }
    }
});
const productsOptionsValuesToProductsOptionsInputType = new graphql_1.GraphQLInputObjectType({
    name: "ProductsOptionsValuesToProductsOptionsType",
    fields: {
        products_options_values_to_products_options_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_options_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_options_values_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        }
    }
});
const productsOptionsValuesInputType = new graphql_1.GraphQLInputObjectType({
    name: "ProductsOptionsValuesType",
    fields: {
        products_options_values_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        languages_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_options_values_name: {
            type: graphql_1.GraphQLString
        }
    }
});
const productsAttributesInputType = new graphql_1.GraphQLInputObjectType({
    name: "ProductsAttributesType",
    fields: {
        products_attributes_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        options_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        options_values_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        options_values_price: {
            type: graphql_1.GraphQLFloat
        },
        price_prefix: {
            type: graphql_1.GraphQLBoolean
        }
    }
});
const categoriesInputType = new graphql_1.GraphQLInputObjectType({
    name: "CategoriesType",
    fields: {
        categories_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        categories_image: {
            type: graphql_1.GraphQLString
        },
        parent_categories_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        sort_order: {
            type: graphql_1.GraphQLInt
        },
        date_added: {
            type: graphql_1.GraphQLString
        },
        last_modified: {
            type: graphql_1.GraphQLString
        }
    }
});
const categoriesDescriptionInputType = new graphql_1.GraphQLInputObjectType({
    name: "CategoriesDescriptionType",
    fields: {
        categories_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        languages_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        categories_name: {
            type: graphql_1.GraphQLString
        }
    }
});
const productsToCategoriesInputType = new graphql_1.GraphQLInputObjectType({
    name: "ProductsToCategoriesType",
    fields: {
        products_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        },
        categories_id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
        }
    }
});

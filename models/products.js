import mongoose  from 'mongoose';
import {toJSON}  from './plugins/toJson.js';

const productSchema = mongoose.Schema(
    {
        id: {
        type: String
        },
        site_id: {
        type: String
        },
        title: {
        type: String
        },
        seller_id: {
        type: Number
        },
        category_id: {
        type: String
        },
        user_product_id: {
        type: String
        },
        official_store_id: {
        type: mongoose.Schema.Types.Mixed
        },
        price: {
        type: Number
        },
        base_price: {
        type: Number
        },
        original_price: {
        type: mongoose.Schema.Types.Mixed
        },
        inventory_id: {
        type: mongoose.Schema.Types.Mixed
        },
        currency_id: {
        type: String
        },
        initial_quantity: {
        type: Number
        },
        available_quantity: {
        type: Number
        },
        sold_quantity: {
        type: Number
        },
        sale_terms: {
        type: [
            mongoose.Schema.Types.Mixed
        ]
        },
        buying_mode: {
        type: String
        },
        listing_type_id: {
        type: String
        },
        start_time: {
        type: Date
        },
        stop_time: {
        type: Date
        },
        end_time: {
        type: Date
        },
        expiration_time: {
        type: Date
        },
        condition: {
        type: String
        },
        permalink: {
        type: String
        },
        thumbnail_id: {
        type: String
        },
        thumbnail: {
        type: String
        },
        pictures: {
        type: [
            mongoose.Schema.Types.Mixed
        ]
        },
        video_id: {
        type: mongoose.Schema.Types.Mixed
        },
        descriptions: {
        type: Array
        },
        accepts_mercadopago: {
        type: Boolean
        },
        non_mercado_pago_payment_methods: {
        type: Array
        },
        shipping: {
        mode: {
            type: String
        },
        methods: {
            type: Array
        },
        tags: {
            type: Array
        },
        dimensions: {
            type: mongoose.Schema.Types.Mixed
        },
        local_pick_up: {
            type: Boolean
        },
        free_shipping: {
            type: Boolean
        },
        logistic_type: {
            type: mongoose.Schema.Types.Mixed
        },
        store_pick_up: {
            type: Boolean
        }
        },
        international_delivery_mode: {
        type: String
        },
        seller_address: {
        id: {
            type: Number
        }
        },
        seller_contact: {
        contact: {
            type: String
        },
        other_info: {
            type: String
        },
        country_code: {
            type: Date
        },
        area_code: {
            type: String
        },
        phone: {
            type: String
        },
        country_code2: {
            type: Date
        },
        area_code2: {
            type: String
        },
        phone2: {
            type: String
        },
        email: {
            type: String
        },
        webpage: {
            type: String
        }
        },
        location: {
        address_line: {
            type: String
        },
        zip_code: {
            type: String
        },
        neighborhood: {
            id: {
            type: String
            },
            name: {
            type: String
            }
        },
        city: {
            id: {
            type: String
            },
            name: {
            type: String
            }
        },
        state: {
            id: {
            type: String
            },
            name: {
            type: String
            }
        },
        country: {
            id: {
            type: String
            },
            name: {
            type: String
            }
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
        },
        geolocation: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
        },
        coverage_areas: {
        type: Array
        },
        attributes: {
        type: [
            mongoose.Schema.Types.Mixed
        ]
        },
        warnings: {
        type: Array
        },
        listing_source: {
        type: String
        },
        variations: {
        type: Array
        },
        status: {
        type: String
        },
        sub_status: {
        type: Array
        },
        tags: {
        type: [
            String
        ]
        },
        warranty: {
        type: mongoose.Schema.Types.Mixed
        },
        catalog_product_id: {
        type: String
        },
        domain_id: {
        type: String
        },
        seller_custom_field: {
        type: mongoose.Schema.Types.Mixed
        },
        parent_item_id: {
        type: mongoose.Schema.Types.Mixed
        },
        differential_pricing: {
        type: mongoose.Schema.Types.Mixed
        },
        deal_ids: {
        type: Array
        },
        automatic_relist: {
        type: Boolean
        },
        date_created: {
        type: Date
        },
        last_updated: {
        type: Date
        },
        health: {
        type: Number
        },
        catalog_listing: {
        type: Boolean
        },
        item_relations: {
        type: Array
        },
        channels: {
        type: [
            String
        ]
        }
    },{
        timestamps: true,
      });

// Agrega el plugin de conversion de mongoose a json
productSchema.plugin(toJSON);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

export {Product};
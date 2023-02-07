const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        productId: { type: Number, required: true },
        code: String,
        name: String,
        brand: String,
        description: String,
        release_date: Date,
        specs: { type: Array, default: [] },
    },
    {
        collection: 'products',
        timestamps: true,
    },
);

const cartSchema = new Schema(
    {
        userId: Number,
        status: { type: String, default: 'active' },
        modifiedOn: { type: Date, default: Date.now },
        products: Array,
    },
    {
        collection: 'carts',
        timestamps: true,
    },
);

const orderSchema = new Schema(
    {
        orderId: Number,
        userId: Number,
        shipping: Object,
        payment: Object,
        products: Array,
    },
    {
        collection: 'orders',
        timestamps: true,
    },
);

const invetorySchema = new Schema(
    {
        productId: Number,
        quanlity: Number,
        reservations: Array,
        created_at: { type: Date, default: Date.now },
    },
    {
        collection: 'inventories',
        timestamps: true,
    },
);

module.exports = {
    _product: model('products', productSchema),
    _order: model('orders', orderSchema),
    _cart: model('carts', cartSchema),
    _inventory: model('inventories', invetorySchema),
};

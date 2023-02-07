'use strict';

const bcrypt = require('bcrypt');

// models
const {
    _product,
    _order,
    _cart,
    _inventory,
} = require('../models/ecommerce.model');

var that = (module.exports = {
    // add product
    addProduct: async (product) => {
        return await _product.create(product);
    },
    //add inventory
    addInventory: async (inventory) => {
        return await _inventory.create(inventory);
    },
    addToCart: async ({ productId, quanlity, userId }) => {
        try {
            const stock = await _inventory.findOneAndUpdate(
                { productId, quanlity: { $gt: quanlity } },
                {
                    $inc: { quanlity: -quanlity },
                    $push: { reservations: { userId, quanlity, productId } },
                },
            );
            console.log('STOCK: ', stock);
            if (stock) {
                // add to cart

                const addToCart = await _cart.findOneAndUpdate(
                    { userId },
                    { $push: { products: { productId, quanlity } } },
                    { upsert: true, new: true },
                );
                console.log('CART: ', addToCart);
                return 1;
            }
            return 0;
        } catch (error) {
            return { message: error.message };
        }
    },
});

'use strict';

//Services
const {
    addProduct,
    addInventory,
    addToCart,
} = require('../services/ecommerce.service');

var that = (module.exports = {
    addToCart: async (req, res, next) => {
        try {
            const { productId, quanlity, userId } = req.body;
            return res.status(200).json({
                elements: await addToCart({ productId, quanlity, userId }),
            });
        } catch (error) {
            next(error);
        }
    },
    addInventory: async (req, res, next) => {
        try {
            const { inventory } = req.body;
            return res.status(200).json({
                elements: await addInventory(inventory),
            });
        } catch (error) {
            next(error);
        }
    },
    addProduct: async (req, res, next) => {
        try {
            const { product } = req.body;
            return res.status(200).json({
                elements: await addProduct(product),
            });
        } catch (error) {
            next(error);
        }
    },
});

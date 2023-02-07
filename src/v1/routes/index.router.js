const express = require('express');
const router = express.Router();

//Controllers
const { verifyOtp, regisUser } = require('../controllers/user.controller');
// ecommerce controllers
const {
    addProduct,
    addInventory,
    addToCart,
} = require('../controllers/ecommerce.controller');

// route ecommerce
router.put('/v1/ecommerce/product', addProduct);
router.put('/v1/ecommerce/inventory', addInventory);
router.put('/v1/ecommerce/addToCart', addToCart);

router.post('/v1/users/register', regisUser);
router.post('/v1/users/verify', verifyOtp);
module.exports = router;

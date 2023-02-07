'use strict';

//Services
const { vertifyOtp, regisUser } = require('../services/user.service');

var that = (module.exports = {
    verifyOtp: async (req, res, next) => {
        try {
            const { email, otp } = req.body;
            const { code, elements, message } = await vertifyOtp({
                email,
                otp,
            });
            return res.status(200).json({
                code,
                message,
                elements,
            });
        } catch (error) {
            console.error(error);
        }
    },
    regisUser: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { code, message, elements } = await regisUser({ email });
            return res.status(code).json({ code, elements, message });
        } catch (error) {
            next(error);
        }
    },
});

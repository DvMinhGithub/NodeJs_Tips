'use strict';

const bcrypt = require('bcrypt');

// models
const _Otp = require('../models/otp.model');

var that = (module.exports = {
    validOtp: async ({ otp, hashOtp }) => {
        try {
             const isValid = await bcrypt.compare(otp, hashOtp);
            return isValid
        } catch (error) {
            console.error(error);
        }
    },
    insertOtp: async ({ email, otp }) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashOtp = await bcrypt.hash(otp, salt);
            const Otp = await _Otp.create({
                email,
                otp: hashOtp,
            });
            return Otp ? 1 : 0;
        } catch (error) {
            console.error(error);
        }
    },
});

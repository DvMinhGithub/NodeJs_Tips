'use strict';

const otpGenerator = require('otp-generator');

//Models
const _User = require('../models/user.model');
const _Otp = require('../models/otp.model');

//Services
const { validOtp, insertOtp } = require('./otp.service');

// Utils
var that = (module.exports = {
    vertifyOtp: async ({ email, otp }) => {
        try {
            const otpHolder = await _Otp.find({ email });
            if (!otpHolder.length) {
                return {
                    code: 404,
                    message: `Expired OTP`,
                };
            }
            // Get last OTP
            const lastOtp = otpHolder[otpHolder.length - 1];
            const isValid = await validOtp({
                otp,
                hashOtp: lastOtp.otp,
            });
            if (!isValid) {
                return {
                    code: 401,
                    message: `Invalid OTP`,
                };
            }
            if (isValid && email === lastOtp.email) {
                // create user
                const user = await _User.create({
                    username: 'cr2',
                    email,
                    userId: 1,
                });
                if (user) {
                    // delete many otp in data
                    await _Otp.deleteMany({ email });
                }
                return {
                    code: 201,
                    elements: user,
                };
            }
        } catch (error) {
            console.error(error);
        }
    },
    regisUser: async ({ email }) => {
        const user = await _User.findOne({ email });
        if (user) {
            return {
                code: 400,
                message: `This email is already in use`,
            };
        }
        const OTP = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        console.log(`OTP: ${OTP}`);
        return {
            code: 200,
            elements: await insertOtp({
                email,
                otp: OTP,
            })
        };
    },
});

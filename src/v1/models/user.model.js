const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        userId: { type: Number, required: true },
        email: String,
        username: String,
    },
    { collection: 'users', timestamps: true },
);

module.exports = model('users', UserSchema);

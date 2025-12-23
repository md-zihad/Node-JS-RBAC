const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false // Mongoose will exclude this field when you query the model.  User.findOne({ username }).select('+password');
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "manager", "user"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    }


}, {
    timestamps: true,
    versionKey: false
})

const User = model('User', userSchema)

module.exports = User
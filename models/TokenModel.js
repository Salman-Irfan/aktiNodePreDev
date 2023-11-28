const { mongoose } = require("mongoose");


const { Schema } = mongoose;

const TokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600 // 1 hours
    }
});

module.exports = mongoose.model("Tokens", TokenSchema);
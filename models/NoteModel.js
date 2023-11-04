const { mongoose } = require("mongoose");


const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: ["general"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Notes", NoteSchema);
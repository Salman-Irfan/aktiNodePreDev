const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
        
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    dob: {
        type: Date,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    interests: {
        type: Array,
        default: []
    },
    hobbies: {
        type: Array,
        default: []
    },
    skills: {
        type: Array,
        default: []
    },
    experience: {
        type: Number,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    },
    verified: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
// Pre-remove hook to delete associated notes
userSchema.pre('remove', async function (next) {
    try {
        // Access the Note model
        const Note = require('./NoteModel'); // Replace with the actual path to your Note model

        // Remove all notes associated with the user
        await Note.deleteMany({ userId: this._id });

        // Continue with the next middleware
        next();
    } catch (error) {
        // Handle the error, e.g., log it
        console.error('Error deleting associated notes:', error);

        // Continue with the next middleware even if there's an error
        next();
    }
});

module.exports = mongoose.model('User', userSchema);
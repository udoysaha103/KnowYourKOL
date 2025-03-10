// schema for google user collection
const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    name: {
        familyName: { type: String, required: true },
        givenName: { type: String, required: true }
    },
    emails: [{
        value: { type: String, required: true },
        verified: { type: Boolean, required: true }
    }],
    photos: [{
        value: { type: String, required: true }
    }],
    timestamp: { type: Date, default: Date.now }
})

// signup method
googleUserSchema.statics.signup = async function (googleId, displayName, name, emails, photos) {
    // checking if the account already exists
    const exists = await this.findOne({ googleId });
    if (exists) {
        throw Error("User already exists");
    }

    // creating the new user
    const newUser = await this.create({
        googleId,
        displayName,
        name,
        emails,
        photos
    })
    return newUser;
}

const googleUserModel = mongoose.model("googleUsers", googleUserSchema);
module.exports = googleUserModel;
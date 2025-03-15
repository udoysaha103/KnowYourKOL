const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    datePosted: { type: Date, default: Date.now },
    reviewDescription: { type: String, required: false },
    reviewType: { type: Boolean, required: true }, // true for positive, false for negative
    reviewGiver: { type: mongoose.Schema.Types.ObjectId, ref: "userModel", required: true },
    reviewReceiver: { type: mongoose.Schema.Types.ObjectId, ref: "userModel", required: true },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }],
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }],
})

const reviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;
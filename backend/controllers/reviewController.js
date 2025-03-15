const reviewModel = require("../models/reviewModel");
const verifiedKOLmodel = require("../models/verifiedKOLmodel");
const mongoose = require("mongoose");
const getReview = async (req, res) => {
    try {
        const review = await reviewModel.find();
        res.status(200).json(review);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const submitReview = async (req, res) => {
    const {reviewDescription, reviewType, reviewReceiver} = req.body;
    const likedBy = [];
    const dislikedBy = [];

    const review = { reviewDescription, reviewType, reviewGiver:req.user._id, reviewReceiver, likedBy, dislikedBy };
    const newReview = new reviewModel(review);
    try {
        await newReview.save();
        
        // add +1 to the sentiment score of the user who received the review if the review is positive
        if (reviewType) {
            const user = await verifiedKOLmodel.findById(reviewReceiver);
            user.sentimentScore += 1;
            await user.save();
        }
        // subtract -1 to the sentiment score of the user who received the review if the review is negative
        else {
            const user = await verifiedKOLmodel.findById(reviewReceiver);
            user.sentimentScore -= 1;
            await user.save();
        }

        res.status(201).json(newReview);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


const likeReview = async (req, res) => {
    const reviewGiverID = req.user._id;
    const { reviewId, reviewReceiverID } = req.body;
    try {
        const review = await reviewModel.findById(reviewId);
        const reviewReceiver = await verifiedKOLmodel.findById(reviewReceiverID);

        if (!review.likedBy.includes(reviewGiverID)) {  // not liked yet
            if (review.dislikedBy.includes(reviewGiverID)) {// remove the dislike if any
                // calculate the current weight contribution of the review to the entire sentiment score of the receiver
                const reviewWeight = (review.likedBy.length - review.dislikedBy.length) * ((review.likedBy.length + 1) / (review.likedBy.length + review.dislikedBy.length + 1));
                const newWeight = (review.likedBy.length - review.dislikedBy.length) * ((review.likedBy.length + 2) / (review.likedBy.length + review.dislikedBy.length + 1));
                reviewReceiver.cookerCount += 1;
                reviewReceiver.farmerCount -= 1;
                review.dislikedBy = review.dislikedBy.filter((id) => id.toString() !== reviewGiverID.toString());

                // update the sentiment score of the receiver
                reviewReceiver.sentimentScore -= reviewWeight;
                reviewReceiver.sentimentScore += newWeight;
                await reviewReceiver.save();
            }
            else { // no dislike was found
                // calculate the current weight contribution of the review to the entire sentiment score of the receiver
                const reviewWeight = (review.likedBy.length - review.dislikedBy.length) * ((review.likedBy.length + 1) / (review.likedBy.length + review.dislikedBy.length + 1));
                const newWeight = (review.likedBy.length + 1 - review.dislikedBy.length) * ((review.likedBy.length + 2) / (review.likedBy.length + review.dislikedBy.length + 2));

                // update the sentiment score of the receiver
                reviewReceiver.sentimentScore -= reviewWeight;
                reviewReceiver.sentimentScore += newWeight;
                reviewReceiver.cookerCount += 1;
                await reviewReceiver.save();
            }

            // add the like
            review.likedBy.push(reviewGiverID);
        }
        else{// withdraw the like
            // calculate the current weight contribution of the review to the entire sentiment score of the receiver
            const reviewWeight = (review.likedBy.length - review.dislikedBy.length) * ((review.likedBy.length + 1) / (review.likedBy.length + review.dislikedBy.length + 1));
            const newWeight = (review.likedBy.length - 1 - review.dislikedBy.length) * ((review.likedBy.length) / (review.likedBy.length + review.dislikedBy.length + 1));

            // update the sentiment score of the receiver
            reviewReceiver.sentimentScore -= reviewWeight;
            reviewReceiver.sentimentScore += newWeight;
            reviewReceiver.cookerCount -= 1;
            await reviewReceiver.save();

            // remove the like
            review.likedBy = review.likedBy.filter((id) => id.toString() !== reviewGiverID.toString());
        }

        await review.save();
        res.status(200).json(review);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const dislikeReview = async (req, res) => {
    const reviewGiverID = req.user._id;
    const { reviewId, reviewReceiverID } = req.body;
    try {
        const review = await reviewModel.findById(reviewId);
        const reviewReceiver = await verifiedKOLmodel.findById(reviewReceiverID);

        if (!review.dislikedBy.includes(reviewGiverID)) {  // not disliked yet
            if (review.likedBy.includes(reviewGiverID)) {// remove the like if any
                // calculate the current weight contribution of the review to the entire sentiment score of the receiver
                const reviewWeight = (review.likedBy.length - review.dislikedBy.length) * ((review.likedBy.length + 1) / (review.likedBy.length + review.dislikedBy.length + 1));
                const newWeight = (review.likedBy.length - review.dislikedBy.length - 2) * ((review.likedBy.length) / (review.likedBy.length + review.dislikedBy.length + 1));

                // update the sentiment score of the receiver
                reviewReceiver.sentimentScore -= reviewWeight;
                reviewReceiver.sentimentScore += newWeight;
                reviewReceiver.cookerCount -= 1;
                reviewReceiver.farmerCount += 1;
                review.likedBy = review.likedBy.filter((id) => id.toString() !== reviewGiverID.toString());
                await reviewReceiver.save();
            }
            else { // no like was found
                // calculate the current weight contribution of the review to the entire sentiment score of the receiver
                const reviewWeight = (review.likedBy.length - review.dislikedBy.length) * ((review.likedBy.length + 1) / (review.likedBy.length + review.dislikedBy.length + 1));
                const newWeight = (review.likedBy.length - review.dislikedBy.length - 1) * ((review.likedBy.length + 1) / (review.likedBy.length + review.dislikedBy.length + 2));

                // update the sentiment score of the receiver
                reviewReceiver.sentimentScore -= reviewWeight;
                reviewReceiver.sentimentScore += newWeight;
                reviewReceiver.farmerCount += 1;
                await reviewReceiver.save();
            }

            // add the dislike
            review.dislikedBy.push(reviewGiverID);
        }
        else{// withdraw the dislike
            // calculate the current weight contribution of the review to the entire sentiment score of the receiver
            const reviewWeight = (review.likedBy.length - review.dislikedBy.length) * ((review.likedBy.length + 1) / (review.likedBy.length + review.dislikedBy.length + 1));
            const newWeight = (review.likedBy.length - review.dislikedBy.length + 1) * ((review.likedBy.length + 1) / (review.likedBy.length + review.dislikedBy.length + 1));

            // update the sentiment score of the receiver
            reviewReceiver.sentimentScore -= reviewWeight;
            reviewReceiver.sentimentScore += newWeight;
            reviewReceiver.farmerCount -= 1;
            await reviewReceiver.save();

            // remove the dislike
            review.dislikedBy = review.likedBy.filter((id) => id.toString() !== reviewGiverID.toString());
        }

        await review.save();
        res.status(200).json(review);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = { getReview, submitReview, likeReview, dislikeReview };
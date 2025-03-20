const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const { getReviews, submitReview, likeReview, dislikeReview } = require("../controllers/reviewController");

// get the review list
router.get("/getReviews/:id", getReviews);

// submit a review, requires authentication
router.post("/submitReview", requireAuth, submitReview);

// like a review
router.put("/likeReview", requireAuth, likeReview);

// dislike a review
router.put("/dislikeReview", requireAuth, dislikeReview);

module.exports = router;
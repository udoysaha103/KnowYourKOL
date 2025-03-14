const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const { getReview, submitReview, likeReview, dislikeReview } = require("../controllers/reviewController");

// get the review list
router.get("/getReview", getReview);

// submit a review, requires authentication
router.post("/submitReview", requireAuth, submitReview);

// like a review
router.get("/likeReview", requireAuth, likeReview);

// dislike a review
router.get("/dislikeReview", requireAuth, dislikeReview);

module.exports = router;
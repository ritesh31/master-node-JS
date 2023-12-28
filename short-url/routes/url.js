const express = require("express");
const {
  generateNewShortURL,
  redirectToShortUrl,
  getAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", generateNewShortURL);
router.get("/analytics/:shortId", getAnalytics);

router.route("/:shortId").get(redirectToShortUrl);
module.exports = router;

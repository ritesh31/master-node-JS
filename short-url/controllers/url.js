const shortid = require("shortid");
const URL = require("../models/url");

async function generateNewShortURL(req, res) {
  const shortId = shortid.generate();

  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

async function redirectToShortUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({
    shortId,
  });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  generateNewShortURL,
  redirectToShortUrl,
  getAnalytics,
};

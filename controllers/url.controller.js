import Url from "../models/Url.model.js";
import { nanoid } from "nanoid";

async function generateNewShortUrl(req, res) {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).json({
        success: false,
        message: "no url found, please send a valid url",
      });
    }

    const shortId = nanoid(7);

    await Url.create({
      shortId,
      redirectUrl: body.url,
      visitHistory: [],
    });

    return res.status(201).json({
      id: shortId,
      success: true,
      message: "shortner url created successfully.",
    });
  } catch (error) {
    console.error("Error in generate shortener link:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during generate short url",
    });
  }
}

async function getOriginalLink(req, res) {
  try {
    const shortId = req.params.shortId;
    // Add validation for shortId
    if (!shortId || shortId.length !== 7) {
      return res.status(400).json({
        success: false,
        message: "Invalid short URL ID",
      });
    }
    const entry = await Url.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
        $inc: { clicks: 1 },
      }
    );
    //if entry not found
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }
    return res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error in getOriginalLink:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  // Add validation for shortId
  if (!shortId || shortId.length !== 7) {
    return res.status(400).json({
      success: false,
      message: "Invalid short URL ID",
    });
  }
  //find the url
  const result = await Url.findOne({ shortId });
  // if not found
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Invalid short URL ID",
    });
  }
  return res.status(200).json({
    success: true,
    message: "no of clicks data fetched successfully",
    totalclicks: result.clicks,
    visitHistory:result.visitHistory
  });
}
export { generateNewShortUrl, getOriginalLink, getAnalytics };

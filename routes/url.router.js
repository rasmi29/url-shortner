import express from 'express';
const router = express.Router();
import { generateNewShortUrl, getAnalytics, getOriginalLink } from '../controllers/url.controller.js';

router.post('/',generateNewShortUrl)
router.get("/:shortId",getOriginalLink)
router.get("/analytics/:shortId",getAnalytics)

export default router
import express from "express";
import {
  createShortUrl,
  getOriginalURL
} from "@controllers/URL";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/shorten/:shortCode", getOriginalURL);
// router.put("/shorten/:shortCode", updateShortUrl);
// router.delete("/shorten/:shortCode", deleteShortUrl);
// router.get("/shorten/:shortCode/stats", getUrlStats);

export default router;

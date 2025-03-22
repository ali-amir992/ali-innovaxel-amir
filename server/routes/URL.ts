import express from "express";
import {
  createShortUrl,
} from "@controllers/URL";

const router = express.Router();

router.post("/shorten", createShortUrl);
// router.get("/shorten/:shortCode", getOriginalUrl);
// router.put("/shorten/:shortCode", updateShortUrl);
// router.delete("/shorten/:shortCode", deleteShortUrl);
// router.get("/shorten/:shortCode/stats", getUrlStats);

export default router;

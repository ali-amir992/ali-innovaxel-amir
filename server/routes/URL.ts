import express from "express";
import {
  createShortURL,
  getOriginalURL,
  updateShortURL,
  deleteShortURL,
  getShortURLStats
} from "@controllers/URL";

const router = express.Router();

router.post("/shorten", createShortURL);
router.get("/shorten/:shortCode", getOriginalURL);
router.put("/shorten/:shortCode", updateShortURL);
router.delete("/shorten/:shortCode", deleteShortURL);
router.get("/shorten/:shortCode/stats", getShortURLStats);

export default router;

import { Request, Response } from "express";
import { generateShortCode } from "@utils/shortCodeGenerator";
import URLModel from "@models/URL";

export const createShortURL = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;

        if (!url) {
            res.status(400).json({ error: "URL is required" });
            return;
        }

        // Check if the URL already exists in the database
        let existingUrl = await URLModel.findOne({ url });
        if (existingUrl) {
            res.status(400).json({ error: "Url already exists" });
            return;
        }

        // Generate a unique short code
        const shortCode = generateShortCode();
        const shortUrl = await URLModel.create({ url, shortCode });

        res.status(201).json(shortUrl);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};


// Retrieve original URL
export const getOriginalURL = async (req: Request, res: Response) => {
    try {
        const { shortCode } = req.params;

        // Find the URL document in the database
        const url = await URLModel.findOne({ shortCode });

        if (!url) {
            res.status(404).json({ error: "Short URL not found" });
            return;
        }

        //incrementing the count
        url.accessCount += 1;
        await url.save();

        res.status(200).json({
            id: url._id,
            url: url.url,
            shortCode: url.shortCode,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt,
        });
    } catch (error) {
        console.error("Error retrieving original URL:", error);
        res.status(500).json({ error: "Server error" });
    }
};


export const updateShortURL = async (req: Request, res: Response) => {
    try {
        const { shortCode } = req.params;
        const { url } = req.body;

        // Validate request body
        if (!url) {
            res.status(400).json({ error: "URL is required" });
            return;
        }

        // Find and update the URL document
        const updatedUrl = await URLModel.findOneAndUpdate(
            { shortCode },
            { url: url, updatedAt: new Date() }, // Update URL and timestamp
            { new: true } // Return the updated document
        );

        if (!updatedUrl) {
            res.status(404).json({ error: "Short URL not found" });
            return;
        }

        res.status(200).json({
            id: updatedUrl._id,
            url: updatedUrl.url,
            shortCode: updatedUrl.shortCode,
            createdAt: updatedUrl.createdAt,
            updatedAt: updatedUrl.updatedAt,
        });
    } catch (error) {
        console.error("Error updating short URL:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const deleteShortURL = async (req: Request, res: Response) => {
    try {
        const { shortCode } = req.params;

        // Find and delete the short URL
        const deletedUrl = await URLModel.findOneAndDelete({ shortCode });

        if (!deletedUrl) {
            res.status(404).json({ error: "Short URL not found" });
            return
        }

        // Respond with 204 No Content on successful deletion
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting short URL:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getShortURLStats = async (req: Request, res: Response) => {
    try {
        const { shortCode } = req.params;

        // Find the URL in the database
        const urlEntry = await URLModel.findOne({ shortCode });

        if (!urlEntry) {
             res.status(404).json({ error: "Short URL not found" });
             return;
        }

        // Return statistics including access count
        res.status(200).json({
            id: urlEntry._id,
            url: urlEntry.url,
            shortCode: urlEntry.shortCode,
            createdAt: urlEntry.createdAt,
            updatedAt: urlEntry.updatedAt,
            accessCount: urlEntry.accessCount,
        });
    } catch (error) {
        console.error("Error fetching short URL stats:", error);
        res.status(500).json({ error: "Server error" });
    }
}

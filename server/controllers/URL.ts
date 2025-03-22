import { Request, Response } from "express";
import { generateShortCode } from "@utils/shortCodeGenerator";
import URLModel from "@models/URL";

export const createShortUrl = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;

        if (!url) {
            res.status(400).json({ error: "URL is required" });
            return;
        }

        // Check if the URL already exists in the database
        let existingUrl = await URLModel.findOne({ url });
        if (existingUrl) {
            res.status(200).json(existingUrl); // if true, return the existing url
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



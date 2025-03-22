import { nanoid } from "nanoid";

export const generateShortCode = (length = 6): string => nanoid(length);

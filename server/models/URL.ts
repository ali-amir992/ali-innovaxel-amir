import mongoose, { Document, Schema } from "mongoose";

export interface IURL extends Document {
  url: string;
  shortCode: string;
  accessCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const URLSchema = new Schema<IURL>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    accessCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//creating an index on ShortCode to ensure fast lookups
URLSchema.index({ shortCode: 1 }, { unique: true });

const URLModel = mongoose.model<IURL>("URL", URLSchema);

export default URLModel;

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
      unique: true, //automatically index is created for fast retrievals
    },
    accessCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


const URLModel = mongoose.model<IURL>("URL", URLSchema);

export default URLModel;

import { Schema } from 'mongoose';

const UrlHistorySchema = new Schema(
  {
    previousUrl: { type: String },
    currentUrl: { type: String },
  },
  { timestamps: true },
);

export const UrlSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    actualUrl: { type: String, required: true },
    shortenedUrl: { type: String, unique: true, required: true },
    urlHistory: [UrlHistorySchema],
  },
  { timestamps: true },
);

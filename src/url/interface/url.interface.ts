import { Schema, Document } from 'mongoose';

interface UrlHistory {
  previousUrl: Date;
  currentUrl: string;
}

export interface Url extends Document {
  userId: Schema.Types.ObjectId;
  actualUrl: string;
  shortenedUrl: string;
  urlHistory: UrlHistory[];
}

export interface UpdateUrl {
  message: string;
}

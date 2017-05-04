import { Document } from 'mongoose';

export interface IThumbnail extends Document {
    name: string,
    thumbnail: [string]
}
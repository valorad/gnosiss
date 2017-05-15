import { model, Schema } from 'mongoose';

import { IThumbnail } from "../interfaces/IThumbnail.interface";

// Create Schema and Model
const thumbnailSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: [],
        required: true
    },
});

export const thumbnails = model<IThumbnail>('thumbnails', thumbnailSchema);
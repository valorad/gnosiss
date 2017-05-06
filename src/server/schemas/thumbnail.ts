import { model, Schema } from 'mongoose';

import { IThumbnail } from "../interfaces/IThumbnail.interface";

// Create Schema and Model
const thumbnailSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    thumbnails: {
        type: [],
        required: true
    },
});

export const thumbnails = model<IThumbnail>('thumbnail', thumbnailSchema);
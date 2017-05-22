import * as fs from 'fs';
import * as path from 'path';
import * as GridFsStorage from 'multer-gridfs-storage';

const Grid = require('gridfs-stream');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//read settings synclly first
// const siteConfig: [any] = require('./configs/gnosiss.json'); // <-- NOT WORKING

const file: string = path.join(__dirname,'configs/gnosiss.json');
const siteConfig: [any] = JSON.parse(fs.readFileSync(file, 'utf8'));

const gnosiss = siteConfig[0];

// mongo connection
const mongoInstance = mongoose.connect(`mongodb://${ gnosiss.mongo.user }:${ gnosiss.mongo.password }@localhost/${ gnosiss.mongo.db }?authSource=${ gnosiss.mongo.authDB }`);
// grid fs
Grid.mongo = mongoose.mongo;
const dAgfs = Grid(mongoInstance.connection.db);



mongoose.connection
.once('open', () => {
    console.log(`Connection to ${ gnosiss.mongo.db } established successfully.`);
})
.on('error', (error) => {
    console.error(error);
})
;

/** Setting up storage using multer-gridfs-storage */
let storageA = GridFsStorage({
    gfs : dAgfs,
    filename: (req, file, cb) => {
        let datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    },
    /** With gridfs we can store aditional meta-data along with the file */
    metadata: (req, file, cb) => {
        cb(null, { originalname: file.originalname });
    },
    root: 'imgFiles' //root name for collection to store files into
});

let storageB = GridFsStorage({
    gfs : dAgfs,
    filename: (req, file, cb) => {
        let datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    },
    /** With gridfs we can store aditional meta-data along with the file */
    metadata: (req, file, cb) => {
        cb(null, { originalname: file.originalname });
    },
    root: 'thumbnailFiles' //root name for collection to store files into
});

export const imgStorage = storageA;
export const thumbnailStorage = storageB;

export const gfs = dAgfs;

export const mgInstance = mongoInstance;

export const config = gnosiss;

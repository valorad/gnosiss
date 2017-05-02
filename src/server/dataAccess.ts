import * as fs from 'fs';
import * as path from 'path';

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//read settings synclly first
// const siteConfig: [any] = require('./configs/gnosiss.json'); // <-- NOT WORKING

const file: string = path.join(__dirname,'configs/gnosiss.json');
const siteConfig: [any] = JSON.parse(fs.readFileSync(file, 'utf8'));

const gnosiss = siteConfig[0];

// mongo connection
const mongoInstance = mongoose.connect(`mongodb://${ gnosiss.mongo.user }:${ gnosiss.mongo.password }@localhost/${ gnosiss.mongo.db }?authSource=${ gnosiss.mongo.authDB }`);

mongoose.connection
.once('open', () => {
    console.log(`Connection to ${ gnosiss.mongo.db } established successfully.`);
})
.on('error', (error) => {
    console.error(error);
})
;


export const mgInstance = mongoInstance;

export const config = gnosiss;

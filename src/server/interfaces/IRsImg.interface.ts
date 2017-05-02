import { Document } from 'mongoose';

import { IBasicInfo } from './RSImg/IBasicInfo.interface';
import { IDateInfo } from './RSImg/IDateInfo.interface';
import { ISpatialInfo } from './RSImg/ISpatialInfo.interface';

export interface IRsImg extends Document {
    name: string,
    extension: string,
    basicInfo?: IBasicInfo,
    dateInfo?: IDateInfo,
    spatialInfo? :ISpatialInfo
}
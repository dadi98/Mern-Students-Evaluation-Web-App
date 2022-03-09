import { Schema, model } from 'mongoose';

import Promotion from '../interfaces/promotion';
import Group from '../interfaces/group';

const groupSchema: Schema = new Schema<Group>({
    groupNumber: {
        type: String,
        required: true
        
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'student'
    }]
},{
    timestamps: true
});

const promotionSchema: Schema = new Schema<Promotion>({
    year: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true,
    },
    numberOfGroups: {
        type: Number,
        required: true,
    },
    groups: [groupSchema]
},{
    timestamps: true
});

export default model<Promotion>('promotion', promotionSchema);
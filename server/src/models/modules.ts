import { Schema, model } from 'mongoose';

import Module from '../interfaces/module';

const moduleSchema: Schema = new Schema<Module>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    promotion: {
        /*type: String,
        required: true*/
        type: Schema.Types.ObjectId,
        ref: 'promotion',
        required: true
    },
    major: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true,
    },
    coef: {
        type: Number,
        required: true,
    },
    controlCoef: {
        type: Number,
        defaults: 0.00
    },
    examCoef: {
        type: Number,
        defaults: 0.00
    }
},{
    timestamps: true
});

export default model<Module>('module', moduleSchema);

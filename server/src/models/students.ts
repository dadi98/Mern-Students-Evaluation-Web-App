import { Schema, model } from 'mongoose';

import Student from '../interfaces/student';

const studentSchema: Schema = new Schema<Student>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cardId: {
        type: Number,
        required: true,
        unique: true
    },
    promo: {
        type: String,
        required: true
    },
    group: {
        type: Number,
    }
},{
    timestamps: true
});

export default model<Student>('student', studentSchema);

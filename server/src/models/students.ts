import { Schema, model } from 'mongoose';

import Student from '../interfaces/student';

const studentSchema: Schema = new Schema<Student>({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        //required: true
    },
    birthDate: {
        type: String,
        //required: true,
    },
    birthPlace: {
        type: String,
       // required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    registrationStatus: {
        type: String,
        //required: true,
    },
},{
    timestamps: true
});

export default model<Student>('student', studentSchema);

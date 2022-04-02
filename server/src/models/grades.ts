import { Schema, model } from 'mongoose';
import Evaluation from '../interfaces/evaluation';
import Grade from '../interfaces/grade';

const evaluationSchema: Schema = new Schema<Evaluation>({
    type: {
        type: String,
        required: true
    },
    absent: {
        type: Boolean,
        default: false
    },
    value: {
        type: Number,
        default: 0.00
    }
},{
    timestamps: true
});

const gradeSchema: Schema = new Schema<Grade>({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    evaluations: [evaluationSchema]
},{
    timestamps: true
});

export default model<Grade>('grade', gradeSchema);

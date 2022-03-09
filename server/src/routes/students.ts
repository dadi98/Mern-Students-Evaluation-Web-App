import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import Students from '../models/students';
import Student from '../interfaces/student'

const studentRouter = express.Router();

studentRouter.use(bodyParser.json());

studentRouter.route('/')
.get(async(req: Request, res: Response, next: NextFunction) =>{
    try{
        let students: Student[] = await Students.find(req.query);
        return res.status(200).setHeader('Content-Type', 'application/json').json(students);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.post(async(req: Request, res: Response, next: NextFunction) => {
    try{
        let student: Student = await Students.create(req.body);
        return res.status(200).setHeader('Content-Type', 'application/json').json(student);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    try{
        let students: Student[] = await Students.remove({});
        return res.status(200).setHeader('Content-Type', 'application/json').json(students);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

studentRouter.route('/:studentId')
.get(async(req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;
    try{
        let student: Student | null = await Students.findById(studentId);

        return student ? res.status(200).setHeader('Content-Type', 'application/json').json(student) : 
                         res.status(404).setHeader('Content-Type', 'plain/text').send(`Student with id: ${studentId} does not exist`);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.put(async(req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;
    try{
        let student: Student | null = await Students.findByIdAndUpdate(studentId, {
            $set: req.body
        }, { new: true });
        return res.status(200).setHeader('Content-Type', 'application/json').json(student);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;
    try{
        await Students.findByIdAndRemove(studentId);
        return res.status(200).json({ message: 'student deleted successfully.' });
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

export default studentRouter;
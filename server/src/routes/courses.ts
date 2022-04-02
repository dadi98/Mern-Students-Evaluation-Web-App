import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import Courses from '../models/courses';
import Course from '../interfaces/course'

const courseRouter = express.Router();

courseRouter.use(bodyParser.json());

courseRouter.route('/')
.get(async(req: Request, res: Response, next: NextFunction) =>{
    try{
        let courses: Course[] = await Courses.find({}).populate([{
            path: 'teacher'
        }, {
            path: 'promotion',
            
            populate: { path: 'groups.students' }
          }])
        return res.status(200).setHeader('Content-Type', 'application/json').json(courses);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.post(async(req: Request, res: Response, next: NextFunction) => {
    try{
        let course: Course = await Courses.create(req.body);
        return res.status(200).setHeader('Content-Type', 'application/json').json(course);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    try{
        let courses: Course[] = await Courses.remove({});
        return res.status(200).setHeader('Content-Type', 'application/json').json(courses);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

courseRouter.route('/:CourseId')
.get(async(req: Request, res: Response, next: NextFunction) => {
    const { CourseId } = req.params;
    try{
        let course: Course | null = await Courses.findById(CourseId);

        return course ? res.status(200).setHeader('Content-Type', 'application/json').json(course) : 
                         res.status(404).setHeader('Content-Type', 'plain/text').send(`Student with id: ${CourseId} does not exist`);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.put(async(req: Request, res: Response, next: NextFunction) => {
    const { CourseId } = req.params;
    try{
        let course: Course | null = await Courses.findByIdAndUpdate(CourseId, {
            $set: req.body
        }, { new: true });
        return res.status(200).setHeader('Content-Type', 'application/json').json(course);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    const { CourseId } = req.params;
    try{
        await Courses.findByIdAndRemove(CourseId);
        return res.status(200).json({ message: 'student deleted successfully.' });
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

export default courseRouter;
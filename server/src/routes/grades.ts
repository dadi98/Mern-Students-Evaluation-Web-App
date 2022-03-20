import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import Grades from '../models/grades'
import Grade from '../interfaces/grade';
import Evaluation from '../interfaces/evaluation';

const gradeRouter = express.Router();

gradeRouter.use(bodyParser.json());

gradeRouter.route('/')
.get(async(req: Request, res: Response, next: NextFunction) =>{
    console.log(1);
    try{
        let grades: Grade[] = await Grades.find(req.query).populate('student course');
        return res.status(200).setHeader('Content-Type', 'application/json').json(grades);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.post(async(req: Request, res: Response, next: NextFunction) => {
    try{
        let grade: Grade = await Grades.create(req.body);
        return res.status(200).setHeader('Content-Type', 'application/json').json(grade);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    try{
        let grades: Grade[] = await Grades.remove({});
        return res.status(200).setHeader('Content-Type', 'application/json').json(grades);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

gradeRouter.route('/:gradeId')
.get(async(req: Request, res: Response, next: NextFunction) => {
    const { gradeId } = req.params;
    try{
        let grade: Grade | null = await Grades.findById(gradeId);

        return grade ? res.status(200).setHeader('Content-Type', 'application/json').json(grade) : 
                         res.status(404).setHeader('Content-Type', 'plain/text').send(`Grade with id: ${gradeId} does not exist`);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.put(async(req: Request, res: Response, next: NextFunction) => {
    const { gradeId } = req.params;
    try{
        let grade: Grade | null = await Grades.findByIdAndUpdate(gradeId, {
            $set: req.body
        }, { new: true });
        return res.status(200).setHeader('Content-Type', 'application/json').json(grade);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    const { gradeId } = req.params;
    try{
        await Grades.findByIdAndRemove(gradeId);
        return res.status(200).json({ message: 'Grade deleted successfully.' });
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////000000000000000000000000000000000000000000/////////////////////////////////
//////////////////oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo//////////////////
//////oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo//////
//////////////////oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo//////////////////
///////////////////////////////000000000000000000000000000000000000000000/////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

gradeRouter.route('/:gradeId/evaluations')
.get(async(req: Request, res: Response, next: NextFunction) =>{
    const { gradeId } = req.params;
    try{
        let grade: Grade | null = await Grades.findById(gradeId);
        return grade ? res.status(200).setHeader('Content-Type', 'application/json').json(grade.evaluations) : 
                         res.status(404).setHeader('Content-Type', 'plain/text').send(`Grade :${gradeId} does not exist`);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.post(async(req: Request, res: Response, next: NextFunction) => {
    
    const { gradeId } = req.params;
    const error = () => { let err = new Error('Grade ' + gradeId + ' not found');
                          res.status(404);
                          return next(err); }
    try{
        //console.log(1);
        let grade: Grade | null = await Grades.findById(gradeId);
        const evaluation = req.body as any;
        grade ? grade.evaluations.push(evaluation as Evaluation)  :  error();
        
        let updatedGrade: Grade | null = await Grades.findByIdAndUpdate(gradeId, {
            $set: { evaluations: grade!.evaluations }
        }, { new: true })
         
        return res.status(200).setHeader('Content-Type', 'application/json').json(updatedGrade?.evaluations);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    const { gradeId } = req.params;
    try{
        
        await Grades.findByIdAndUpdate(gradeId, {
            $set: { evaluations: [] }
        }, { new: true });
        
        return res.status(200).json({ message: `Grade ${gradeId} all evaluations are deleted successfully.` });
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

gradeRouter.route('/:gradeId/evaluations/:evaluationId')
.get(async(req: Request, res: Response, next: NextFunction) => {
    const { gradeId, evaluationId } = req.params;
    try{
        let grade: Grade | null = await Grades.findById(gradeId);
        //console.log(Grade);
        let evaluation: Evaluation = grade!.evaluations.filter(evaluation => evaluation._id == evaluationId )[0];
        //console.log(evaluation);
        grade ? 
                evaluation ? 
                       res.status(200).setHeader('Content-Type', 'application/json').json(evaluation)  :
                       res.status(404).setHeader('Content-Type', 'plain/text').send(`evaluation with id: ${evaluationId} does not exist`) :
            res.status(404).setHeader('Content-Type', 'plain/text').send(`Grade with id: ${gradeId} does not exist`)            
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.put(async(req: Request, res: Response, next: NextFunction) => {
    const { gradeId, evaluationId } = req.params;
    try{
        let grade: Grade | null = await Grades.findById(gradeId);
        if(!grade){
           return res.status(404).setHeader('Content-Type', 'plain/text').send(`Grade with id: ${gradeId} does not exist`) 
        }
        
        let evaluation = {...req.body as unknown as Evaluation, _id: evaluationId};
        let evaluations: Evaluation[] = grade.evaluations.filter(evaluation => evaluation._id != evaluationId );
        evaluations.push(evaluation);
        
        
        let updatedGrade: Grade | null = await Grades.findByIdAndUpdate(gradeId, {
            $set: { evaluations: evaluations }
        }, { new: true })
         
        return res.status(200).setHeader('Content-Type', 'application/json').json(updatedGrade?.evaluations
                                                                                .filter(evaluation => evaluation._id == evaluationId )[0]);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    const { gradeId, evaluationId } = req.params;
    try{
        let grade: Grade | null = await Grades.findById(gradeId);
        if(!grade){
           return res.status(404).setHeader('Content-Type', 'plain/text').send(`Grade with id: ${gradeId} does not exist`) 
        }
        
        let evaluations: Evaluation[] = grade.evaluations.filter(evaluation => evaluation._id != evaluationId );
        
        let updatedGrade: Grade | null = await Grades.findByIdAndUpdate(gradeId, {
            $set: { evaluations: evaluations }
        }, { new: true })
        return res.status(200).json({ message: 'student deleted successfully.', evaluations: updatedGrade!.evaluations });
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

export default gradeRouter;
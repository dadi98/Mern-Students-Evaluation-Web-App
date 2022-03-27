import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import Modules from '../models/modules';
import Module from '../interfaces/module'

const moduleRouter = express.Router();

moduleRouter.use(bodyParser.json());

moduleRouter.route('/')
.get(async(req: Request, res: Response, next: NextFunction) =>{
    try{
        let modules: Module[] = await Modules.find({}).populate([{
            path: 'teacher'
        }, {
            path: 'promotion',
            
            populate: { path: 'groups.students' }
          }])
        return res.status(200).setHeader('Content-Type', 'application/json').json(modules);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.post(async(req: Request, res: Response, next: NextFunction) => {
    try{
        let module: Module = await Modules.create(req.body);
        return res.status(200).setHeader('Content-Type', 'application/json').json(module);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    try{
        let modules: Module[] = await Modules.remove({});
        return res.status(200).setHeader('Content-Type', 'application/json').json(modules);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

moduleRouter.route('/:moduleId')
.get(async(req: Request, res: Response, next: NextFunction) => {
    const { moduleId } = req.params;
    try{
        let course: Module | null = await Modules.findById(moduleId);

        return course ? res.status(200).setHeader('Content-Type', 'application/json').json(course) : 
                         res.status(404).setHeader('Content-Type', 'plain/text').send(`Student with id: ${moduleId} does not exist`);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.put(async(req: Request, res: Response, next: NextFunction) => {
    const { moduleId } = req.params;
    try{
        let module: Module | null = await Modules.findByIdAndUpdate(moduleId, {
            $set: req.body
        }, { new: true });
        return res.status(200).setHeader('Content-Type', 'application/json').json(module);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    const { moduleId } = req.params;
    try{
        await Modules.findByIdAndRemove(moduleId);
        return res.status(200).json({ message: 'student deleted successfully.' });
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

export default moduleRouter;
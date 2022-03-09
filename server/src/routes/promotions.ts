import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import Promotion from '../interfaces/promotion';
import Promotions from '../models/promotions';
import Group from '../interfaces/group';

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.get(async(req: Request, res: Response, next: NextFunction) =>{
    console.log(1);
    try{
        let promotions: Promotion[] = await Promotions.find({});
        return res.status(200).setHeader('Content-Type', 'application/json').json(promotions);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.post(async(req: Request, res: Response, next: NextFunction) => {
    try{
        let promotion: Promotion = await Promotions.create(req.body);
        return res.status(200).setHeader('Content-Type', 'application/json').json(promotion);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    try{
        let promotions: Promotion[] = await Promotions.remove({});
        return res.status(200).setHeader('Content-Type', 'application/json').json(promotions);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

promotionRouter.route('/:promotionId')
.get(async(req: Request, res: Response, next: NextFunction) => {
    const { promotionId } = req.params;
    try{
        let promotion: Promotion | null = await Promotions.findById(promotionId).populate('groups.students');;

        return promotion ? res.status(200).setHeader('Content-Type', 'application/json').json(promotion) : 
                         res.status(404).setHeader('Content-Type', 'plain/text').send(`Promotion with id: ${promotionId} does not exist`);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.put(async(req: Request, res: Response, next: NextFunction) => {
    const { promotionId } = req.params;
    try{
        let promotion: Promotion | null = await Promotions.findByIdAndUpdate(promotionId, {
            $set: req.body
        }, { new: true });
        return res.status(200).setHeader('Content-Type', 'application/json').json(promotion);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    const { promotionId } = req.params;
    try{
        await Promotions.findByIdAndRemove(promotionId);
        return res.status(200).json({ message: 'promotion deleted successfully.' });
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

promotionRouter.route('/:promotionId/groups')
.get(async(req: Request, res: Response, next: NextFunction) =>{
    const { promotionId } = req.params;
    try{
        let promotion: Promotion | null = await Promotions.findById(promotionId);
        return promotion ? res.status(200).setHeader('Content-Type', 'application/json').json(promotion.groups) : 
                         res.status(404).setHeader('Content-Type', 'plain/text').send(`promotion :${promotionId} does not exist`);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.post(async(req: Request, res: Response, next: NextFunction) => {
    const { promotionId } = req.params;
    
    try{
        console.log(1);
        let promotion: Promotion | null = await Promotions.findById(promotionId);
        const error = () => { let err = new Error('promotion ' + promotionId + ' not found');
                          res.status(404);
                          return next(err); }
        const group = req.body as any;
        promotion ? promotion.groups.push(group as Group)  :  error();
        
        let updatedPromo: Promotion | null = await Promotions.findByIdAndUpdate(promotionId, {
            $set: { groups: promotion!.groups }
        }, { new: true })
         
        return res.status(200).setHeader('Content-Type', 'application/json').json(updatedPromo?.groups);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    const { promotionId } = req.params;
    try{
        
        await Promotions.findByIdAndUpdate(promotionId, {
            $set: { groups: [] }
        }, { new: true });
        
        return res.status(200).json({ message: `promotion ${promotionId} all groups are deleted successfully.` });
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

promotionRouter.route('/:promotionId/groups/:groupId')
.get(async(req: Request, res: Response, next: NextFunction) => {
    const { promotionId, groupId } = req.params;
    try{
        let promotion: Promotion | null = await Promotions.findById(promotionId).populate('groups.students');
        //console.log(promotion);
        let group: Group = promotion!.groups.filter(group => group._id == groupId )[0];
        //console.log(group);
        promotion ? 
                  group ? 
                       res.status(200).setHeader('Content-Type', 'application/json').json(group)  :
                       res.status(404).setHeader('Content-Type', 'plain/text').send(`group with id: ${groupId} does not exist`) :
                res.status(404).setHeader('Content-Type', 'plain/text').send(`promotion with id: ${promotionId} does not exist`)            
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }  
})
.put(async(req: Request, res: Response, next: NextFunction) => {
    const { promotionId, groupId } = req.params;
    try{
        let promotion: Promotion | null = await Promotions.findById(promotionId);
        if(!promotion){
           return res.status(404).setHeader('Content-Type', 'plain/text').send(`promotion with id: ${promotionId} does not exist`) 
        }
        
        let group = {...req.body as unknown as Group, _id: groupId};
        let groups: Group[] = promotion.groups.filter(group => group._id != groupId );
        groups.push(group);
        
        
        let updatedPromo: Promotion | null = await Promotions.findByIdAndUpdate(promotionId, {
            $set: { groups: groups }
        }, { new: true })
         
        return res.status(200).setHeader('Content-Type', 'application/json').json(updatedPromo?.groups
                                                                                .filter(group => group._id == groupId )[0]);
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
})
.delete(async(req: Request, res: Response, next: NextFunction) => {
    const { promotionId, groupId } = req.params;
    try{
        let promotion: Promotion | null = await Promotions.findById(promotionId);
        if(!promotion){
           return res.status(404).setHeader('Content-Type', 'plain/text').send(`promotion with id: ${promotionId} does not exist`) 
        }
        
        let groups: Group[] = promotion.groups.filter(group => group._id != groupId );
        
        let updatedPromo: Promotion | null = await Promotions.findByIdAndUpdate(promotionId, {
            $set: { groups: groups }
        }, { new: true })
        return res.status(200).json({ message: 'student deleted successfully.', groups: updatedPromo!.groups });
    }
    catch(err){
        if(err instanceof Error) {
            next(err);
        }
    }
});

export default promotionRouter;

import express, {Request, Response, NextFunction} from 'express';

const bodyParser = require('body-parser');
let passport = require('passport');
import User from '../models/users';
let authenticate = require('../authenticate');

let router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', /* authenticate.verifyUser, authenticate.verifyAdmin,*/ function(req:Request, res:Response, next:NextFunction) {
  //res.send('respond with a resource');
  User.find(req.query)
    .then((users: any) => {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(users);
    }, (err: any) => next(err)
    ).catch((err: any) => next(err));
});


router.route('/:userId')
/*.put(async(req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try{
      let user = await User.findByIdAndUpdate(userId, {
          $set: req.body
      }, { new: true });
      return res.status(200).setHeader('Content-Type', 'application/json').json(user);
  }
  catch(err){
      if(err instanceof Error) {
          next(err);
      }
  }
})*/
.delete(async(req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try{
      await User.findByIdAndRemove(userId);
      return res.status(200).json({ message: 'student deleted successfully.' });
  }
  catch(err){
      if(err instanceof Error) {
          next(err);
      }
  }
});


router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err: any, user: any) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      if (req.body.role)
        user.role = req.body.role;
      user.save((err: any, user: any) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req: any, res: any) => {
  //console.log(req)
  var user = req.user
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, user: user, status: 'You are successfully logged in!'});
});

router.get('/logout', (req: any, res: Response, next: NextFunction) => {
  //console.log(req.headers.authorization)
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    let err: any = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

export default router;

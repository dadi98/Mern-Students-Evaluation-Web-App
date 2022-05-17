import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

//import BaseRouter from './routes';
import logger from '@shared/Logger';
import mongoose from 'mongoose';
import seedDb from './seedMongo';

import studentRouter from './routes/students'
import courseRouter from './routes/courses';
import promotionRouter from './routes/promotions';
import gradeRouter from './routes/grades';
import usersRouter from './routes/Users'

const app = express();
const { BAD_REQUEST } = StatusCodes;

const connect = mongoose.connect("mongodb://localhost:27017/grades");
connect.then((db) => {
    console.log("Connected correctly to server");
    //seedDb();
}, (err) => { console.log(err); });



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}
var allowCrossDomain = function(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

// Add APIs
//app.use('/api', BaseRouter);
app.use('/students', studentRouter);
app.use('/courses', courseRouter);
app.use('/promotions', promotionRouter)
app.use('/grades', gradeRouter)
app.use('/users', usersRouter)


// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;

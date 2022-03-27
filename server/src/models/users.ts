import { Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
//import Module from '../interfaces/module';

const User = new Schema({
    firstname: {
        type: String,
        default: ''
        
    },
    lastname: {
        type: String,
        default: '',
        
    },
    role:   {
        type: String,
        
    }
});

User.plugin(passportLocalMongoose);

const user: any = model('User', User);

export default user;

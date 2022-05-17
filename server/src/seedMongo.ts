/* mySeedScript.js */

// require the necessary libraries
import { faker } from "@faker-js/faker";
const MongoClient = require("mongodb").MongoClient;

/*function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}*/

export default async function seedDB(this: any) {
    // Connection URL
    const uri = "mongodb://localhost:27017/grades";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("grades").collection("grades");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        //collection.drop();

        // make a bunch of time series data
        let users: any = [];
        let students = ['62777f03f498d25cf3e2b608', '62777f03f498d25cf3e2b609', '62777f03f498d25cf3e2b60a', '62777f03f498d25cf3e2b60b', '62777f03f498d25cf3e2b60c', '62777f03f498d25cf3e2b60d', '62777f03f498d25cf3e2b60e', '62777f03f498d25cf3e2b60f', '62777f03f498d25cf3e2b610', '62777f03f498d25cf3e2b611', '62777f03f498d25cf3e2b612', '62777f03f498d25cf3e2b613', '62777f03f498d25cf3e2b614', '62777f03f498d25cf3e2b615', '62777f03f498d25cf3e2b616', '62777f03f498d25cf3e2b617', '62777f03f498d25cf3e2b618', '62777f03f498d25cf3e2b619', '62777f03f498d25cf3e2b61a', '62777f03f498d25cf3e2b61b', '62777f03f498d25cf3e2b61c', '62777f03f498d25cf3e2b61d', '62777f03f498d25cf3e2b61e', '62777f03f498d25cf3e2b61f', '62777f03f498d25cf3e2b620', '62777f03f498d25cf3e2b621', '62777f03f498d25cf3e2b622', '62777f03f498d25cf3e2b623', '62777f03f498d25cf3e2b624', '62777f03f498d25cf3e2b625', '62777f03f498d25cf3e2b626', '62777f03f498d25cf3e2b627', '62777f03f498d25cf3e2b628', '62777f03f498d25cf3e2b629', '62777f03f498d25cf3e2b62a', '62777f03f498d25cf3e2b62b', '62777f03f498d25cf3e2b62c', '62777f03f498d25cf3e2b62d', '62777f03f498d25cf3e2b62e', '62777f03f498d25cf3e2b62f', '62777f03f498d25cf3e2b630', '62777f03f498d25cf3e2b631', '62777f03f498d25cf3e2b632', '62777f03f498d25cf3e2b633', '62777f03f498d25cf3e2b634', '62777f03f498d25cf3e2b635', '62777f03f498d25cf3e2b636', '62777f03f498d25cf3e2b637', '62777f03f498d25cf3e2b638', '62777f03f498d25cf3e2b639'];
        let courses = ['620a687af9b180164eba8427', '620a6a1af9b180164eba842e', '620a6a43f9b180164eba8430', '620a6b84f9b180164eba8434', '620a6bd3f9b180164eba8436', '620a6c4ef9b180164eba8438', '620a6c6ef9b180164eba843a', '620a6cacf9b180164eba843c', '620a6ccdf9b180164eba843e', '620a6d31f9b180164eba8440', '620ac77e870cb9631f82aeda', '620ac7b8870cb9631f82aedc'];
        
        for (let i = 0; i < students.length; i++) {
            for (let j = 0; j < courses.length; j++){
            /*
            let newStudent = {
                studentId: faker.random.numeric(12),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                sex: faker.helpers.arrayElement(['Male', 'Female']),
                
                degree: faker.helpers.arrayElement(['License']),
                level: faker.helpers.arrayElement(['L3']),
                registrationStatus: faker.helpers.arrayElement(['valid']),
            };*/
            let newUser = {
                student: students[i],
                course: courses[j],
                evaluations: [
                    {
                        type: 'Control',
                        absent: 'false',
                        value: faker.datatype.number({ min: 0, max: 20, precision: 0.50 })
                    },
                    {
                        type: 'Exam',
                        absent: 'false',
                        value: faker.datatype.number({ min: 0, max: 20, precision: 0.50 })
                    }
                ],
                
            };
/*
            for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
                let newEvent = {
                    timestamp_event: faker.date.past(),
                    weight: randomIntFromInterval(14,16),
                }
                newDay.events.push(newEvent);
            }*/
            users.push(newUser);
          }
        }
        collection.insertMany(users);
        //console.log(users)
        console.log("Database seeded! :)");
        
    } catch (error) {
        if (error instanceof Error)
        console.log(error.stack);
    }
}

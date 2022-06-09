import semesterAverage from "./semesterAverage";

export default function (students, grades){
    
    const averages = [];
     
    students.forEach(student => averages.push(
        semesterAverage(grades.filter(grade => grade.student._id===student._id))[0]
    ))

    const passedStudents = (averages.filter(average => average >= 10).length / averages.length) * 100;
    const failedStudents = 100 - passedStudents;



    return [passedStudents, failedStudents];
}
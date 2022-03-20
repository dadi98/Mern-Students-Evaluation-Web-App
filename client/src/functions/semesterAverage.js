import courseAverage from "./courseAverage";
//a single student all courses in a single semester
export default function (semesterCourses){
    
    if (semesterCourses.length===0) {
        return [0.00, 0];
    }
    
    let total = semesterCourses.reduce((total, item) => {
        
        return  total + courseAverage(item) * item.course.coef;
    }, 0);

    let coefTotal = semesterCourses.reduce((total, item) => {
                        return total + item.course.coef }, 0);
    
    return [total / coefTotal, coefTotal];
}

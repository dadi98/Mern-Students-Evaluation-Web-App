import Promotion from "./promotion";
import Teacher from "./teacher";
export default interface Course {
    name: string;
    teacher: Teacher;//= userID (isTeacher = true)
    type: string;
    promotion: Promotion;
    major: string;
    semester: string;
    coef: number;
    controlCoef: number;
    examCoef: number;
}
import Promotion from "./promotion";
export default interface Module {
    name: string;
    teacher: string;//= userID (isTeacher = true)
    type: string;
    promotion: string;
    semester: string;
    coef: number;
    controlCoef: number;
    examCoef: number;
}
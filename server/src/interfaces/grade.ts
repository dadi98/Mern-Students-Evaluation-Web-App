import Evaluation from "./evaluation";
import Student from "./student";
import Module from "./module";

export default interface Grade {
    student: Student;
    course: Module;
    evaluations: Evaluation[];
}
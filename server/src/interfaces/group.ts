import Student from "./student";

export default interface Group {
    [x: string ]: string | Student[];
    groupNumber: string;
    students: Student[];    
}
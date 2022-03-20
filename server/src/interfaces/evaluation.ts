export default interface Evaluation {
    [x: string ]: string | boolean | number;
    type: string;
    absent: boolean;
    value: number;
}
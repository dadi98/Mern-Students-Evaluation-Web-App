import Group from "./group";

export default interface Promotion {
    year: string;
    degree: string;
    major: string;
    groups: Group[];    
}
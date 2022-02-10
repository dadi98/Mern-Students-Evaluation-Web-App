interface Student {
    [key: string]: string | number | Date;
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    sex: string;
    birthDate: string;
    birthPlace: string;
    degree: string;
    level: string;
    registrationStatus: string;
}

interface modal {
    show: boolean;
    onHide: () => void;
    data?: Student[];
    id?: string;
}

export type {Student, modal};


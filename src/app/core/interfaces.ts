export interface Subject {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
}

export interface SubjectsResponse {
    subjects: Subject[];
}

export interface Exam {
    _id: string;
    title: string;
    numberOfQuestions: number;
    duration: number;
}

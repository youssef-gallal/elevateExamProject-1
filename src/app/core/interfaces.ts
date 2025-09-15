export interface Subject {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
    title: string
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

export interface Answer {
    key: string;
    answer: string;
}

export interface Question {
    _id: string;
    question: string;
    answers: Answer[];
    correct: string;
}


export interface ExamResponse {
    exams: Exam[];
}

export interface ExamScore {
    percentage: number;
    correct: number;
    incorrect: number;
}

export interface ExamSubmitResult {
    score: ExamScore;
    incorrect: Question[];
    selected: { [key: string]: string };
}

export interface Answer {
    answer: string;
    key: string;
}

export interface Question {
    _id: string;
    question: string;
    answers: Answer[];
    type: string;
    correct: string;
    subject: {
        _id: string;
        name: string;
        icon: string;
        createdAt: string;
    };
    exam: {
        _id: string;
        title: string;
        duration: number;
        subject: string;
        numberOfQuestions: number;
        active: boolean;
        createdAt: string;
    };
    createdAt: string;
}

export interface QuestionsState {
    questions: Question[];
    loading: boolean;
    loader: boolean;
}


import { createReducer, on } from '@ngrx/store';
import { loader, updateQuestion } from './questions.action';
import { QuestionsState } from './question.model';

export const initialState: QuestionsState = {
    questions: [],
    loading: false
};

export const questionsReducer = createReducer(
    initialState,
    on(loader, state => ({
        ...state,
        loading: true
    })),
    on(updateQuestion, (state, { questions }) => ({
        ...state,
        questions,
        loading: false
    }))
);



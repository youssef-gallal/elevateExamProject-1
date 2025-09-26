import { createReducer, on } from '@ngrx/store';
import { hideLoader, loader, resetQuestions, updateQuestion } from './questions.action';
import { QuestionsState } from './question.model';

export const initialState: QuestionsState = {
    questions: [],
    loader: false
};

export const questionsReducer = createReducer(
    initialState,
    on(loader, state => ({
        ...state,
        loader: true
    })),
    on(updateQuestion, (state, { questions }) => ({
        ...state,
        loader: false,
        questions

    })),
    on(hideLoader, state => ({
        ...state,
        loader: false
    })),
    on(resetQuestions, () => initialState)

);



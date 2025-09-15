import { createReducer, on } from '@ngrx/store';
import { hideLoader, loader, showLoader, updateQuestion } from './questions.action';
import { QuestionsState } from './question.model';

export const initialState: QuestionsState = {
    questions: [],
    loading: false,
    loader: false
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
    })),
    on(showLoader, state => ({
        ...state,
        loader: true
    })),
    on(hideLoader, state => ({
        ...state,
        loader: false
    }))
);



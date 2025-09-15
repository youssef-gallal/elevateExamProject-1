
import { createAction, props } from '@ngrx/store';
import { Question } from './question.model';

export const showLoader = createAction
    ('[Loader] Show Loader');

export const hideLoader = createAction
    ('[Loader] Hide Loader');

export const loader = createAction(
    '[Questions] Load loader',
    props<{ examId: string }>()
);

export const updateQuestion = createAction(
    '[Questions] Update Questions',
    props<{ questions: Question[] }>()
);











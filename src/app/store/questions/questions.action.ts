
import { createAction, props } from '@ngrx/store';
import { Question } from './question.model';

export const loader = createAction(
    '[Questions] Load loader',
    props<{ examId: string }>()
);

export const updateQuestion = createAction(
    '[Questions] Update Questions',
    props<{ questions: Question[] }>()
);











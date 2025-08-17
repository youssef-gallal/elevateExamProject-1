

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












export function loadExamQuestionsSuccess(arg0: { questions: any; }): any {
    throw new Error('Function not implemented.');
}

export function loadExamQuestionsFailure(arg0: { error: any; }): any {
    throw new Error('Function not implemented.');
}

export function loadExamQuestions(loadExamQuestions: any): import("rxjs").OperatorFunction<import("@ngrx/store").Action<string>, any> {
    throw new Error('Function not implemented.');
}
// export const loadExamQuestions = createAction(
//     '[Exam Questions] Load Exam Questions',
//     props<{ examId: string }>()
// );

// export const loadExamQuestionsSuccess = createAction(
//     '[Exam Questions] Load Exam Questions Success',
//     props<{ questions: Question[] }>()
// );

// export const loadExamQuestionsFailure = createAction(
//     '[Exam Questions] Load Exam Questions Failure',
//     props<{ error: string }>()
// );

// export const updateQuestion = createAction(
//     '[Exam Questions] Update Question',
//     props<{ questionId: string, changes: Partial<Question> }>()
// );
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ServicesService } from '../../core/pages/service/services.service';
import * as QuestionsActions from './questions.action';
@Injectable()
export class QuestionsEffects {
    private actions$ = inject(Actions);
    private servicesService = inject(ServicesService);

    loadExamQuestions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuestionsActions.loader),
            mergeMap((action) =>
                this.servicesService.getQuestionOnExam(action.examId).pipe(
                    map((response) => QuestionsActions.updateQuestion({
                        questions: response
                    })),
                )
            )
        )
    );
}



import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuestionsState } from "./question.model";

export const selectQuestionsState = createFeatureSelector<QuestionsState>('questions');

export const selectQuestions = createSelector(
    selectQuestionsState,
    (state) => state.questions
);

export const selectQuestionsLoading = createSelector(
    selectQuestionsState,
    (state) => state.loading
);

import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ProgressSpinner } from "primeng/progressspinner";
import { Store } from '@ngrx/store';
import { loader, resetQuestions } from '../../../../store/questions/questions.action';
import { selectQuestions, selectQuestionsLoading } from '../../../../store/questions/question.selector';
import { Question } from '../../../interfaces';

@Component({
  selector: 'app-exam-question',
  standalone: true,
  imports: [FormsModule, RadioButtonModule, CommonModule, AsyncPipe, ProgressSpinner],
  templateUrl: './exam-question.component.html',
  styleUrl: './exam-question.component.css'
})
export class ExamQuestionComponent implements OnChanges {
  @Input() questionsId: string | undefined;

  currentIndex = 0;
  selectedAnswers: { [key: string]: string } = {};
  viewMode: 'questions' | 'results' | 'review' = 'questions';
  correctAnswers = 0;
  incorrectAnswers = 0;
  scorePercentage = 0;
  incorrectQuestions: Question[] = [];
  reviewIndex = 0;
  originalQuestions: Question[] = [];

  @Output() submitted = new EventEmitter<{
    score: { percentage: number; correct: number; incorrect: number };
    incorrect: Question[];
    selected: { [key: string]: string };
  }>();

  private _store = inject(Store);
  questions$ = this._store.select(selectQuestions);
  loading$ = this._store.select(selectQuestionsLoading);



  ngOnChanges() {
    this.currentIndex = 0;
    this.selectedAnswers = {};
    this.viewMode = 'questions';

    if (this.questionsId) {
      this._store.dispatch(loader({ examId: this.questionsId }));
    }
  }

  get totalQuestions(): number {
    return this.originalQuestions.length;
  }

  nextQuestion(questionsLength: number) {
    if (this.currentIndex < questionsLength - 1) {
      this.currentIndex++;
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  selectAnswer(q: Question, key: string) {
    this.selectedAnswers[q._id] = key;
  }

  calculateResults(questions: Question[]) {
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;

    questions.forEach((question: Question) => {
      const selectedAnswer = this.selectedAnswers[question._id];
      const correctAnswer = question.correct;

      if (selectedAnswer === correctAnswer) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers++;
      }
    });
  }

  resetResults() {
    this.viewMode = 'questions';
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
  }

  submitAnswers(questions: Question[]) {
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.incorrectQuestions = [];
    this.originalQuestions = [...questions];

    questions.forEach((question: Question) => {
      const selectedAnswer = this.selectedAnswers[question._id];
      const correctAnswer = question.correct;

      if (selectedAnswer === correctAnswer) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers++;
        this.incorrectQuestions.push(question); // 👈 store directly
      }
    });

    this.scorePercentage = Math.round(
      (this.correctAnswers / questions.length) * 100
    );

    this.submitted.emit({
      score: {
        percentage: this.scorePercentage,
        correct: this.correctAnswers,
        incorrect: this.incorrectAnswers,
      },
      incorrect: this.incorrectQuestions,
      selected: this.selectedAnswers,
    });

    this.viewMode = 'results';
    this._store.dispatch(resetQuestions());

  }

  getSelectedAnswerForReview(index: number): string | undefined {
    const questionId = this.incorrectQuestions[index]._id;
    return this.selectedAnswers[questionId];
  }
  reviewAnswers() {
    this.viewMode = 'review';
    this.reviewIndex = 0;
  }
  next(totalQuestions: number) {
    if (this.viewMode === 'questions') {
      if (this.currentIndex < totalQuestions - 1) {
        this.currentIndex++;
      }
    } else if (this.viewMode === 'review') {
      if (this.reviewIndex < this.incorrectQuestions.length - 1) {
        this.reviewIndex++;
      }
    }
  }
  back() {
    if (this.viewMode === 'questions') {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    } else if (this.viewMode === 'review') {
      if (this.reviewIndex > 0) {
        this.reviewIndex--;
      }
    } else if (this.viewMode === 'results') {
      this.viewMode = 'questions';
    }
  }

}

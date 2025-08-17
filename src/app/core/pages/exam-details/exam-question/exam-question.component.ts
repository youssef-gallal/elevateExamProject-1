import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ProgressSpinner } from "primeng/progressspinner";
import { Store } from '@ngrx/store';
import { loader } from '../../../../store/questions/questions.action';
import { selectQuestions, selectQuestionsLoading } from '../../../../store/questions/question.selector';

@Component({
  selector: 'app-exam-question',
  standalone: true,
  imports: [FormsModule, RadioButtonModule, CommonModule, AsyncPipe],
  templateUrl: './exam-question.component.html',
  styleUrl: './exam-question.component.css'
})
export class ExamQuestionComponent implements OnChanges {
  @Input() questionsId: string | undefined;
  currentIndex = 0;
  selectedAnswers: { [key: string]: string } = {};
  showResults = false;
  correctAnswers = 0;
  incorrectAnswers = 0;
  showQuestions = true;
  scorePercentage: number = 0;
  reviewMode = false;
  incorrectQuestions: any[] = [];
  reviewIndex = 0;
  originalQuestions: any[] = [];

  private _store = inject(Store);
  questions$ = this._store.select(selectQuestions);
  loading$ = this._store.select(selectQuestionsLoading);

  ngOnChanges() {
    this.currentIndex = 0;
    this.selectedAnswers = {};
    this.showResults = false;

    if (this.questionsId) {
      this._store.dispatch(loader({ examId: this.questionsId }));
    }
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

  selectAnswer(qIndex: number, key: string) {
    this.selectedAnswers[qIndex] = key;
  }


  calculateResults(questions: any[]) {
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;

    questions.forEach((question: any, index: number) => {
      const selectedAnswer = this.selectedAnswers[index];
      const correctAnswer = question.correct;
      if (selectedAnswer === correctAnswer) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers++;
      }
    });
  }

  resetResults() {
    this.showResults = false;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
  }

  submitAnswers(questions: any[]) {
    this.calculateResults(questions);
    this.showResults = true;
    this.showQuestions = false;
    this.scorePercentage = Math.round((this.correctAnswers / questions.length) * 100);

    // Store original questions and incorrect questions
    this.originalQuestions = [...questions];
    this.incorrectQuestions = questions.filter((q, i) =>
      this.selectedAnswers[i] !== q.correct
    );
  }

  getSelectedAnswerForReview(index: number): string {
    // Use the stored originalQuestions instead of the parameter
    const originalIndex = this.originalQuestions.findIndex(q =>
      q._id === this.incorrectQuestions[index]._id
    );
    return this.selectedAnswers[originalIndex];
  }


  reviewAnswers() {
    this.reviewMode = true;
    this.showResults = false;
    this.showQuestions = false;
    this.reviewIndex = 0;
  }

  backToResults() {
    this.reviewMode = false;
    this.showResults = true;
  }

  nextReviewQuestion() {
    if (this.reviewIndex < this.incorrectQuestions.length - 1) {
      this.reviewIndex++;
    }
  }

  prevReviewQuestion() {
    if (this.reviewIndex > 0) {
      this.reviewIndex--;
    }
  }
  backToQuestions() {
    this.showResults = false;
    this.showQuestions = true;
  }

}

















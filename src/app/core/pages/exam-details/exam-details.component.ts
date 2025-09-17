import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../service/services.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Store } from '@ngrx/store';
import { ExamQuestionComponent } from "./exam-question/exam-question.component";
import { DialogModule } from 'primeng/dialog';
import { selectLoader, selectQuestions, selectQuestionsLoading } from '../../../store/questions/question.selector';
import { hideLoader, loader, showLoader } from '../../../store/questions/questions.action';
import { ExamResultComponent } from "./exam-result/exam-result.component";
import { ExamReviewComponent } from "./exam-review/exam-review.component";
import { Exam, Question, ExamSubmitResult, ExamScore, ExamResponse } from '../../interfaces';

@Component({
  selector: 'app-exam-details',
  imports: [CardModule, CommonModule, ProgressSpinner, ExamQuestionComponent, DialogModule, ExamResultComponent, ExamReviewComponent],
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.css'
})
export class ExamDetailsComponent implements OnInit {
  visible = false;
  header = '';
  activeStep: 'exam' | 'result' | 'review' = 'exam';

  score: ExamScore | null = null;
  incorrectQuestions: Question[] = [];
  selectedAnswers: { [key: string]: string } = {};

  exams = true;
  exam: Exam[] = [];
  questions: Question[] = [];
  examId: string | null = null;
  questionsId: string | null = null;
  examName = '';

  private _service = inject(ServicesService);
  private _store = inject(Store);

  constructor(private route: ActivatedRoute) { }

  questions$ = this._store.select(selectQuestions);
  loading$ = this._store.select(selectQuestionsLoading);
  loader$ = this._store.select(selectLoader);

  ngOnInit() {
    this.getExamOnSubject();
  }

  getExamOnSubject() {
    this._store.dispatch(showLoader())
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.exams = false;
      this._store.dispatch(hideLoader())
      return;
    }
    this.examId = id;
    this._service.getExamOnSubject(id).subscribe((res: ExamResponse) => {
      if (res.exams && res.exams.length > 0) {
        this.exams = true;
        this.exam = res.exams;
        console.log(res.exams);

        this.questionsId = this.exam[0]?._id ?? null;
        this.examName = this.exam[0].title;
      } else {
        this.exams = false;
      }
      this._store.dispatch(hideLoader())
    });
  }

  openExam() {
    this.visible = true;
    this.header = this.examName;
    this.activeStep = 'exam';
    if (this.questionsId) {
      this._store.dispatch(loader({ examId: this.questionsId }));
    }
  }

  onSubmit(result: ExamSubmitResult) {
    this.score = result.score;
    this.incorrectQuestions = result.incorrect;
    this.selectedAnswers = result.selected;
    this.activeStep = 'result';
    this.header = 'Exam Result';
  }

  goToReview() {
    this.activeStep = 'review';
    this.header = 'Review Answers';
  }

  backToResults() {
    this.activeStep = 'result';
    this.header = 'Exam Result';
  }
}

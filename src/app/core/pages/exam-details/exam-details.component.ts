import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../service/services.service';
import { CardModule } from 'primeng/card';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Store } from '@ngrx/store';
import { ExamQuestionComponent } from "./exam-question/exam-question.component";
import { DialogModule } from 'primeng/dialog';
import { selectQuestions, selectQuestionsLoading } from '../../../store/questions/question.selector';
import { loader } from '../../../store/questions/questions.action';
import { ExamResultComponent } from "./exam-result/exam-result.component";
import { ExamReviewComponent } from "./exam-review/exam-review.component";
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
  score: any;
  incorrectQuestions: any[] = [];
  loading: boolean = false
  selectedAnswers: { [key: string]: string } = {};   // ✅ add this

  exams: boolean = true
  exam: any;
  questions: any[] = [];
  examId: string | null = null;
  questionsId: any;
  examName: string = ''
  _service = inject(ServicesService)
  private _store = inject(Store)
  constructor(private route: ActivatedRoute) { }

  questions$ = this._store.select(selectQuestions);
  loading$ = this._store.select(selectQuestionsLoading);

  ngOnInit() {
    this.getExamOnSubject()
  }

  getExamOnSubject() {
    this.loading = true;
    this.examId = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.exams = false;
      this.loading = false;
      return;
    }
    this.examId = id;
    this._service.getExamOnSubject(id).subscribe((res: any) => {
      if (res.exams && res.exams.length > 0) {
        this.exams = true;
        this.exam = res.exams;
        this.questionsId = this.exam[0]?._id;
        this.examName = this.exam[0].title;
      } else {
        this.exams = false;
      }
      this.loading = false;
    });

    this._service.getExamOnSubject(this.examId).subscribe((res: any) => {
      if (res.exams && res.exams.length > 0) {
        this.exams = true;
        this.exam = res.exams
        console.log(this.exam);
        this.questionsId = this.exam[0]?._id
        console.log('questionid', this.questionsId);
        this.examName = this.exam[0].title
        console.log(this.examName);
        this.loading = false;
      } else {
        this.exams = false;
        this.loading = false;
      }
      console.log('exams :', this.exams);
    })
  }
  openExam() {
    this.visible = true;
    this.header = this.examName;
    this.activeStep = 'exam';
    this._store.dispatch(loader({ examId: this.questionsId }));
  }

  onSubmit(result: { score: any, incorrect: any[], selected: any }) {
    this.score = result.score;
    this.incorrectQuestions = result.incorrect;
    this.selectedAnswers = result.selected;   // <-- keep reference
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

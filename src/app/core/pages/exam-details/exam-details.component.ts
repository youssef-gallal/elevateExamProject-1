import { Component, inject, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-exam-details',
  imports: [CardModule, CommonModule, ProgressSpinner, ExamQuestionComponent, DialogModule],
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.css'
})
export class ExamDetailsComponent implements OnInit {
  loading: boolean = false
  exams: boolean = true
  visible: boolean = false;
  header: string | undefined;
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
    this.visible = true
    this._store.dispatch(loader({ examId: this.questionsId }));
  }
}

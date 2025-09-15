import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ServicesService } from '../service/services.service';
import { ProgressSpinner } from "primeng/progressspinner";
import { Exam, Subject, SubjectsResponse } from '../../interfaces';
import { Subject as DestroySubject, takeUntil } from 'rxjs';
import { selectLoader } from '../../../store/questions/question.selector';
import { Store } from '@ngrx/store';
import { hideLoader, showLoader } from '../../../store/questions/questions.action';
@Component({
  selector: 'app-subjects',
  imports: [PanelMenuModule, CommonModule, ButtonModule, InputTextModule, FormsModule, CardModule, ProgressSpinner],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {
  showAll = false
  subjects: Subject[] = []
  exam: Exam[] = []
  constructor(private service: ServicesService, private router: Router) { }
  private _store = inject(Store);
  loader$ = this._store.select(selectLoader);
  private destroy$ = new DestroySubject<void>();
  ngOnInit() {
    this.getallsubject()
  }

  getallsubject() {
    this._store.dispatch(showLoader())
    this.service.getsubjects().pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: SubjectsResponse) => {
          this.subjects = res.subjects;
          console.log('the subjects', this.subjects);
          this._store.dispatch(hideLoader())
        },
        error: (err) => {
          console.error('Error loading subjects:', err);
          this._store.dispatch(hideLoader())
        }
      });
  }
  getexam(examId: string) {
    this._store.dispatch(showLoader())
    this.service.getExamOnSubject(examId).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (exam) => {
          this._store.dispatch(hideLoader())
        },
        error: (err) => {
          console.error('Error loading exam:', err);
        }
      });
    this.router.navigate(['/Dashboard/exam', examId]);

  }
  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}


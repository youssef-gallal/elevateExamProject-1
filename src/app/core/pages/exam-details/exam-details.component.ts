import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../service/services.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-exam-details',
  imports: [CardModule, CommonModule, ProgressSpinner],
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.css'
})
export class ExamDetailsComponent implements OnInit {
  loading: boolean = true
  exam: any;
  examId: string | null = null;
  constructor(private service: ServicesService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.getExamOnSubject()
  }
  getExamOnSubject() {
    this.loading = true;
    this.examId = this.route.snapshot.paramMap.get('id');
    this.service.getExamOnSubject(this.examId).subscribe((res: any) => {
      this.exam = res.exams
      console.log(this.exam);
      this.loading = false;
    })
  }
}

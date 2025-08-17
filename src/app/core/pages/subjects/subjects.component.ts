import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ServicesService } from '../service/services.service';
import { ProgressSpinner } from "primeng/progressspinner";
@Component({
  selector: 'app-subjects',
  imports: [PanelMenuModule, CommonModule, ButtonModule, InputTextModule, FormsModule, CardModule, ProgressSpinner],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {
  loading: boolean = false
  showAll = false
  subjects: any[] = []
  exam: any = []
  constructor(private service: ServicesService, private router: Router) { }

  ngOnInit() {
    this.getallsubject()
  }
  getallsubject() {
    this.loading = true
    // this.service.getsubject().subscribe((res: any) => {
    //   this.subjects = res.subjects
    //   console.log(this.subjects);
    //   this.loading = false
    // })
    this.service.getsubject().subscribe({
      next: (res: any) => {
        this.subjects = res.subjects
        console.log(this.subjects);
        this.loading = false
      }
    })
  }

  getexam(examId: string) {
    this.loading = true
    this.router.navigate(['/Dashboard/exam', examId]);
    this.service.getExamOnSubject(examId).subscribe({
      next: (exam) => {
        this.loading = false
      },
      error: (err) => {
        console.error('Error loading exam:', err);
      }
    });
  }
  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}


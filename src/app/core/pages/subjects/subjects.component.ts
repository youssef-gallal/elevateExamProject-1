import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ServicesService } from '../service/services.service';
import { ProgressSpinner } from "primeng/progressspinner";
@Component({
  selector: 'app-subjects',
  imports: [PanelMenuModule, CommonModule, RouterLink, ButtonModule, InputTextModule, FormsModule, CardModule, RouterOutlet, ProgressSpinner],
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
    this.service.getsubject().subscribe((res: any) => {
      this.subjects = res.subjects
      console.log(this.subjects);
      this.loading = false
    })
  }

  openExam(examId: string) {
    this.router.navigate(['/Dashboard/exam', examId]);

    this.service.getExamOnSubject(examId).subscribe({
      next: (exam) => {
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


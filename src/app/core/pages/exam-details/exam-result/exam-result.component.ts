// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-exam-result',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './exam-result.component.html',
//   styleUrls: ['./exam-result.component.css']
// })
// export class ExamResultComponent {
//   @Input() score!: { percentage: number, correct: number, incorrect: number };
//   @Output() back = new EventEmitter<void>();
//   @Output() review = new EventEmitter<void>();
// }
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent {
  @Input() score!: { percentage: number, correct: number, incorrect: number };
  @Output() back = new EventEmitter<void>();
  @Output() review = new EventEmitter<void>();

  data: any;
  options: any;

  ngOnInit() {
    this.data = {
      labels: ['Correct', 'Incorrect'],
      datasets: [
        {
          data: [this.score.correct, this.score.incorrect],
          backgroundColor: ['#4CAF50', '#F44336'],
          hoverBackgroundColor: ['#66BB6A', '#EF5350']
        }
      ]
    };

    this.options = {
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: (context: any) => `${context.label}: ${context.raw}`
          }
        }
      }
    };
  }
}

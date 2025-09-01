// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RadioButtonModule } from 'primeng/radiobutton';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-exam-review',
//   standalone: true,
//   imports: [CommonModule, RadioButtonModule, FormsModule],
//   templateUrl: './exam-review.component.html',
//   styleUrls: ['./exam-review.component.css']
// })
// export class ExamReviewComponent {
//   @Input() incorrectQuestions: any[] = [];
//   @Input() selectedAnswers: { [key: number]: string } = {};
//   @Output() backToResults = new EventEmitter<void>();

//   reviewIndex = 0;


//   getSelectedAnswerForReview(q: any): string | null {
//     const idx = this.incorrectQuestions.findIndex(x => x._id === q._id);
//     return this.selectedAnswers[idx] ?? null;
//   }


//   nextReviewQuestion() {
//     if (this.reviewIndex < this.incorrectQuestions.length - 1) {
//       this.reviewIndex++;
//     }
//   }

//   prevReviewQuestion() {
//     if (this.reviewIndex > 0) {
//       this.reviewIndex--;
//     }
//   }
// }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam-review',
  standalone: true,
  imports: [CommonModule, RadioButtonModule, FormsModule],
  templateUrl: './exam-review.component.html',
  styleUrls: ['./exam-review.component.css']
})
export class ExamReviewComponent {
  @Input() incorrectQuestions: any[] = [];
  @Input() selectedAnswers: { [key: string]: string } = {};   // <-- KEY BY question._id
  @Output() backToResults = new EventEmitter<void>();

  reviewIndex = 0;

  /** Returns the user’s chosen answer for this question */
  getSelectedAnswerForReview(q: any): string | null {
    return this.selectedAnswers[q._id] ?? null;
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
}

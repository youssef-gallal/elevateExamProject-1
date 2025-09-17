import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { Question } from '../../../interfaces';

@Component({
  selector: 'app-exam-review',
  standalone: true,
  imports: [CommonModule, RadioButtonModule, FormsModule],
  templateUrl: './exam-review.component.html',
  styleUrls: ['./exam-review.component.css']
})
export class ExamReviewComponent {
  @Input() incorrectQuestions: Question[] = [];
  @Input() selectedAnswers: { [key: string]: string } = {};
  @Output() backToResults = new EventEmitter<void>();

  reviewIndex = 0;

  getSelectedAnswerForReview(q: Question): string | null {
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

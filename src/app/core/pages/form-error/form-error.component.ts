import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (control && control.invalid && (control.touched || control.dirty)) {
      <div class="form-text text-danger">
        @for (error of getErrors(); track error) {
          <div>{{ error }}</div>
        }
      </div>
    }
  `
})
export class FormErrorComponent {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input() messages: Record<string, string> = {};

  getErrors(): string[] {
    if (!this.control || !this.control.errors) return [];
    return Object.keys(this.control.errors).map(
      key => this.messages[key] || key
    );
  }
}

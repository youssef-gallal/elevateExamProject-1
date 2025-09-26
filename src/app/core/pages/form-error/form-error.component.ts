import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-error.component.html'
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

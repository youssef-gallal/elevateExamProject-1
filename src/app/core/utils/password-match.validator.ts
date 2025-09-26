import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function passwordMatchValidator(
    passwordKey: string,
    confirmPasswordKey: string
): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const password = group.get(passwordKey)?.value;
        const confirmPassword = group.get(confirmPasswordKey)?.value;

        if (password && confirmPassword && password !== confirmPassword) {
            group.get(confirmPasswordKey)?.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }

        return null;
    };
}
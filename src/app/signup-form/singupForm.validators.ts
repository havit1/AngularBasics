import { AbstractControl, ValidationErrors } from '@angular/forms';

export class SignupFormValidators {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') !== -1) {
      return {
        cannotContainSpace: true,
      };
    }
    return null;
  }

  static shouildBeUnique(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'sasha') resolve({ shouldBeUnique: true });
        else resolve(null);
      }, 2000);
    });
  }
}

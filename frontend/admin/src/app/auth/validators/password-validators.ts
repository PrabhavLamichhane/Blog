import { AbstractControl } from "@angular/forms";

export class PasswordValidators {

    static passwordsShouldMatch(control: AbstractControl) {
        let password = control.get('password');
        let confirmPassword = control.get('passwordConfirm');

        if (password.value !== confirmPassword.value)
            return { passwordsShouldMatch: true };
        
        return null;

    }
}
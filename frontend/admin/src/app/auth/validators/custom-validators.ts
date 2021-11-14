import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";

import { AppError } from "src/app/shared/errors/app-error";
import { BadInput } from "src/app/shared/errors/bad-input";

@Injectable({
    providedIn: 'root'
})
export class CustomValidators {


    static passwordsShouldMatch(control: AbstractControl) {
        let password = control.get('password');
        let confirmPassword = control.get('passwordConfirm');

        if (password.value !== confirmPassword.value)
            return { passwordsShouldMatch: true };

        return null;

    }

    // static shouldBeUnique(authService,control: AbstractControl): Promise<ValidationErrors | null> {
    //     return new Promise((resolve, reject) => {
    //         console.log(control);
    //         authService.checkEmailExists(control.get('email')).subscribe(result => {
    //             resolve(null);
    //         },
    //             (error: AppError) => {
    //                 if (error instanceof BadInput)
    //                     resolve({ shouldBeUnique: true })
    //                 else resolve(null);
    //                 // else throw error;
    //             });
    //     });
    // }


    static shouldBeUnique(authService: AuthService): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return authService.getUsers()
                .pipe(
                    map(users => {

                        const user = users.find(
                            user => user.email.toLowerCase()
                                == control.value.toLowerCase());

                        return user ? { emailExists: true } : null;
                    }));
                
        }
    }




}
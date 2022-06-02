import { AuthSignUpRest } from './../../store/auth/auth.actions';
import { AppState } from 'src/app/store/app.store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,private store:Store<AppState>) {}

  /*
      ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
      This regex will enforce these rules:

      At least one upper case English letter, (?=.*?[A-Z])
      At least one lower case English letter, (?=.*?[a-z])
      At least one digit, (?=.*?[0-9])
      At least one special character, (?=.*?[#?!@$%^&*-])
      Minimum eight in length .{8,} (with the anchors)
  */

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        mail: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngAfterViewChecked() {
    document
      .querySelector('#password div')
      ?.classList.add('p-input-icon-right');
    document
      .querySelector('#confirmPassword div')
      ?.classList.add('p-input-icon-right');
  }

  onSignup() {
    console.log(this.signupForm.value)
    this.store.dispatch(AuthSignUpRest(this.signupForm.value));
  }
}

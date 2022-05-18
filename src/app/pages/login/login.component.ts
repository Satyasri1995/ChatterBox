import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    this.loginForm = this.fb.group({
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
    });
  }

  ngAfterViewChecked(){
    document.querySelector("#password div")?.classList.add("p-input-icon-right");
  }

  onLogin(){
    console.log(this.loginForm.value)
  }
}

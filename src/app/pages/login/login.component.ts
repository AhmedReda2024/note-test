import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);

  isLoading: boolean = false;

  successMsg: string = '';
  errMsg: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
  });

  submitLoginForm(): void {
    // console.log(this.loginForm.value); // object -- backend that needed.

    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.msg === 'done') {
            console.log(res);

            // save token

            localStorage.setItem('userToken', res.token);

            // toaster

            this.toastrService.success(res.msg, 'GoodNotes');

            // navigate to home

            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 600);
          }
          this.isLoading = false;
          // show success msg
          this.successMsg = res.msg;
        },
        error: (err) => {
          this.isLoading = false;
          // show errors
          this.errMsg = err.error.msg;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

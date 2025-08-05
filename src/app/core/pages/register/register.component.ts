import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from "primeng/button";
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthService } from 'auth';
@Component({
  selector: 'app-register',
  imports: [RouterLink, FloatLabel, RouterModule, RouterLink, InputNumberModule, PasswordModule, FormsModule, ReactiveFormsModule, InputTextModule, IftaLabelModule, Button],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  _authService = inject(AuthService)
  registerForm: FormGroup | any;
  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.registerForm = new FormGroup({
      Email: new FormControl("", Validators.required),
      Fname: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      Lname: new FormControl("", Validators.required),
      rePassword: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
    })
  }
  submit() {
    const model = {
      email: this.registerForm.value.Email,
      username: this.registerForm.value.username,
      firstName: this.registerForm.value.Fname,
      lastName: this.registerForm.value.Lname,
      password: this.registerForm.value.password,
      rePassword: this.registerForm.value.rePassword,
      phone: this.registerForm.value.phone
    }
    console.log(model);

    this._authService.register(model).subscribe({
      next: (res) => console.log(res),
      error(err) {
        console.log(err);

      },

    })
  }
}

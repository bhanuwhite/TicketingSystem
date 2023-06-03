import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataFetchService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userLoginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: DataFetchService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginInit();
  }
  loginInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  login(): void {
    if (this.userLoginForm.invalid) {
      return;
    }
    const data = {
      email: this.userLoginForm.value.email,
      password: this.userLoginForm.value.password,
    };
    this.service.postData('role/login', data).subscribe((res) => {
      console.log(res.data.status);
      if (res.data.status === '200') {
        if (res.data.RoleId === 1) {
          this.router.navigate(['/admin-dashboard']);
        }
        this.storingValuesInLS(res.data);
      }
    });
  }
  storingValuesInLS(response: any) {
    console.log(response);
    localStorage.setItem("name", response.Role);
    localStorage.setItem("roleId", response.RoleId);
    localStorage.setItem("token", response.Token);
  }
}

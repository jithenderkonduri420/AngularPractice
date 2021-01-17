import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService,
    private route: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    // redirect to home if already logged in
    if (this.apiService.currentUser) {
      this.route.navigate(['/dashboard']);
    }
  }
  get f() {
    return this.loginForm.controls;
  }
  public onSubmit() {
    this.submitted = true;

    this.apiService.login(this.loginForm.value).subscribe(res => {
      this.route.navigate(['/dashboard']);
    })
  }
}

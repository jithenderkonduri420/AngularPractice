import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registration: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registration = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }
  get f(){
    return this.registration.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.apiService.registration(this.registration.value).subscribe(res => {
      this.toastr.success('Registration', 'Registration is sucessfully');
      this.route.navigate(['/login']);
    })
  }

}

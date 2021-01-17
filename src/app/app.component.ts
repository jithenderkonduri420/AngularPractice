import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { ApiService } from './_service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  currentUser: User;
  constructor(
    private route: Router,
    private apiService: ApiService
  ) {
  }
  ngOnInit() {
    this.apiService.currentUserValue.subscribe(x => this.currentUser = x);
  }
}

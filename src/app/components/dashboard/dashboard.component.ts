import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/_service/api.service';
import { Child1Component } from './child1/child1.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  currentUser: User;
  myName= "jithender";
  @ViewChild(Child1Component, {static: true}) child1: ElementRef;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.currentUser = this.apiService.currentUser;
    this.apiService.sampleSubject.next('jithender');
  }
  ngAfterViewInit() {
  }
  childAccess(value) {
    this.myName = value;
  }
}

import { Component, OnInit } from '@angular/core';
import { first, map, take } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  users: User;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.apiService.sampleSubject.next('mahesh');
    this.apiService.sampleSubject.next('rajesh');
    this.apiService.sampleSubject$.subscribe(data => console.log('------', data));

  }
  getUsers() {
    this.apiService.users()
    .subscribe(data => this.users = data);
  }

}

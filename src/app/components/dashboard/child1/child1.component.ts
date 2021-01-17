import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css']
})
export class Child1Component implements OnInit {
  @Input() nameRef: string;
  @Output() childMsg = new EventEmitter<String>();
  childName: String = 'child property';
  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
  }
  sendMessage() {
    return this.childMsg.emit('hi Parent');
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-independent',
  templateUrl: './independent.component.html',
  styleUrls: ['./independent.component.css']
})
export class IndependentComponent implements OnInit {
  @Input() nameRef: string;
  constructor() { }

  ngOnInit() {
  }

}

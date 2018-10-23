import { Reader } from './../../models/reader';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lr-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() reader: Reader

  @Output() public edit = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

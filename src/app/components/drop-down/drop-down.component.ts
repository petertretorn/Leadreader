import { MenuItem } from './../../models/menu-item';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lr-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {

  @Input() items: MenuItem[]
  
  constructor() { }

  ngOnInit() {
  }

}

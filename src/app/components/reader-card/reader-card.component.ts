import { Router } from '@angular/router';
import { Reader } from './../../models/reader';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lr-reader-card',
  templateUrl: './reader-card.component.html',
  styleUrls: ['./reader-card.component.scss']
})
export class ReaderCardComponent implements OnInit {

  @Input() 
  public reader: Reader
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoReader(uid: string) {
    console.log('clicking')
    this.router.navigate([`/app/readings/${uid}`])
  }

}

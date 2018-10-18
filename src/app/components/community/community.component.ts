import { Router } from '@angular/router';
import { Reader } from './../../models/reader';
import { Observable } from 'rxjs';
import { ReadersService } from './../../services/readers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lr-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  
  readers: Reader[];

  constructor(public readersService: ReadersService, ) { }

  ngOnInit() {
    this.readersService.getReaders().subscribe(readers => {
      this.readers = readers
    })
  }


}

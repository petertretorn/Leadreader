import { Reading } from './../../models/reading';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'lr-readings-list',
  templateUrl: './readings-list.component.html',
  styleUrls: ['./readings-list.component.scss']
})
export class ReadingsListComponent implements OnInit, OnChanges {

  @Input() readings: Reading[]
  @Input() currentReading: Reading
  @Input() isOwner: boolean

  @Output() selectReading = new EventEmitter();

  isDeleting: boolean
  current: Reading

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentReading = (changes.currentReading) ? changes.currentReading.currentValue : this.currentReading 
    this.isOwner = (changes.isOwner) ? changes.isOwner.currentValue : this.isOwner
    this.readings = (changes.readings) ? changes.readings.currentValue : this.readings
  }
}

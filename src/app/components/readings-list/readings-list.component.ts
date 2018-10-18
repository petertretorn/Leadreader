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

  @Output() deleteReading = new EventEmitter();
  @Output() selectReading = new EventEmitter();

  isDeleting: boolean
  current: Reading

  constructor() { }

  ngOnInit() {
    this.current = this.currentReading
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.current = changes.currentReading.currentValue
  }

  select(reading: Reading) {

  }

  delete(reading: Reading) {
    this.deleteReading.emit(reading)
    this.isDeleting =false
  }

}

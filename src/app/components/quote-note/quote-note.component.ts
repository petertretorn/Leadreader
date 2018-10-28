import { QuoteNote } from './../../models/quote-note';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Reading } from '../../models/reading';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'lr-quote-note',
  templateUrl: './quote-note.component.html',
  styleUrls: ['./quote-note.component.scss']
})
export class QuoteNoteComponent implements OnInit, AfterViewInit {
  

  @Input() quoteNote: QuoteNote
  @Input() isEditing: boolean
  @Input() isOwner: boolean

  @Output() public deleteNote = new EventEmitter<string>();
  @Output() public saveNote = new EventEmitter<QuoteNote>();

  @ViewChild('heading') heading: ElementRef

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.isEditing) {
      this.heading.nativeElement.focus()
    }
  }

  editNote(noteId: string) {
    this.isEditing = true;
    setTimeout(_ => this.heading.nativeElement.focus(), 1)
  }

  save(quoteNote: QuoteNote) {
    this.isEditing = false;
    this.saveNote.emit(quoteNote);
  }


}

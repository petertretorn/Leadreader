import { QuoteNote } from './../../models/quote-note';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reading } from '../../models/reading';

@Component({
  selector: 'lr-quote-note',
  templateUrl: './quote-note.component.html',
  styleUrls: ['./quote-note.component.scss']
})
export class QuoteNoteComponent implements OnInit {

  @Input() quoteNote: QuoteNote
  @Input() isEditing: boolean
  @Input() isOwner: boolean

  @Output() public deleteNote = new EventEmitter<string>();
  @Output() public saveNote = new EventEmitter<QuoteNote>();

  constructor() { }

  ngOnInit() {
  }

  editNote(noteId: string) {
    this.isEditing = true;
  }

  save(quoteNote: QuoteNote) {
    this.isEditing = false;
    this.saveNote.emit(quoteNote);
  }


}

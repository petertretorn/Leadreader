import { QuoteNote } from './../../models/quote-note';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'lr-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {

  quoteNote: QuoteNote = new QuoteNote()
  
  constructor(
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  addQuoteNote() {
    this.dialogRef.close(this.quoteNote)
  }

  cancel() {
    this.dialogRef.close()
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Book } from '../../models/book';

@Component({
  selector: 'lr-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit {

  book: Book = new Book()

  constructor(public dialogRef: MatDialogRef<Book>) { }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.book)
  }

  cancel() {
    this.dialogRef.close(null)
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from '../../models/book';
import { FileService } from '../../services/file.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'lr-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit {

  book: Book = new Book()
  isUploading: boolean

  constructor(
    public dialogRef: MatDialogRef<Book>,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.book = (!!this.data) 
                  ? this.data.book || this.book
                  : this.book

    this.book = { ...this.book }
  }

  save() {
    this.book.isUpdated = true
    this.dialogRef.close(this.book)
  }

  cancel() {
    this.dialogRef.close(null)
  }

  handleFile(event) {

    this.isUploading = true

    if (!!this.book.imageUrl && !!this.book.imageName) {
      this.fileService.deleteFile(this.book.imageName)
    }

    let file = event.target.files[0]
    const name = file.name + new Date().getTime();

    file = new File([file], name, { type: file.type });

    this.fileService.uploadFile(file).then(url => {
      this.book.imageUrl = url
      this.book.imageName = name

      this.isUploading = false
    })
    
  }

}

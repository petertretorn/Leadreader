import { QuoteNote } from 'src/app/models/quote-note';
import { NoteDialogComponent } from "./../note-dialog/note-dialog.component";
import { Reading } from "./../../models/reading";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReadingsService } from "../../services/readings.service";
import { MatDialog } from "@angular/material";
import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { NgZone } from "@angular/core";

@Component({
  selector: "lr-reading-detail",
  templateUrl: "./reading-detail.component.html",
  styleUrls: ["./reading-detail.component.css"]
})
export class ReadingDetailComponent implements OnInit {
  @Input()
  reading: Reading;

  @Output()
  public deleteNote = new EventEmitter<string>();

  @Output()
  public updateReading = new EventEmitter<Reading>();

  // @Output()
  // public addNoteToReading = new EventEmitter<Reading>();

  isEditingNote: boolean = false;

  isInEditMode = {}

  isNew: boolean = false

  newQuote: QuoteNote = null

  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService,
    public dialog: MatDialog,
    private ngZone: NgZone
  ) {  }

  ngOnInit() {
    this.reading.quoteNotes = this.reading.quoteNotes || [];

    this.reading = { ...this.reading }
  }

  editNote(noteId: string) {
    console.log('editNote', noteId)
    this.isInEditMode[noteId] = true
    this.autogrowTextareas()
  }

  saveNote(noteId: string) {
    console.log('saveNote', noteId)
    this.isInEditMode[noteId] = false
    this.updateReading.emit(this.reading)
  }

  autogrowTextareas() {
    setTimeout(() => {
      let textAreas: HTMLTextAreaElement[] = Array.from(document.querySelectorAll('textarea.visible'));

      textAreas.forEach(textArea => {
        textArea.style.overflow = "hidden"
        textArea.style.height = "0px"
        textArea.style.height = (textArea.scrollHeight - 15) + "px"
      })
    }, 1)
  }
 
  addNewNote() {
    this.isNew = true;
    this.newQuote = new QuoteNote()
  }

  save() {
    this.isNew = false;

    this.newQuote.created = new Date();
    this.readingsService.addNoteToReading(this.reading , this.newQuote)

    this.newQuote = null
  }

  openDialog(): void {
    
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe((quoteNote: QuoteNote) => {
      if (!quoteNote) return

      this.ngZone.run( () => {
        quoteNote.created = new Date();
        //this.reading.quoteNotes.push(quoteNote)
        // this.updateReading.emit(this.reading)
  
        quoteNote.created = new Date();
        this.readingsService.addNoteToReading({ ...this.reading }, quoteNote)
      })
      

    });
  }
}

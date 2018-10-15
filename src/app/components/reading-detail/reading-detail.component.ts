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
import { AfterViewInit } from '@angular/core';
import { OnDestroy } from '@angular/core';


declare var tinymce: any;

@Component({
  selector: "lr-reading-detail",
  templateUrl: "./reading-detail.component.html",
  styleUrls: ["./reading-detail.component.scss"]
})
export class ReadingDetailComponent implements OnInit  {
  @Input()
  reading: Reading;

  @Output()
  public deleteNote = new EventEmitter<string>();

  @Output()
  public updateReading = new EventEmitter<Reading>();

  @Output() onEditorKeyup = new EventEmitter<any>();
  public editor:any;

  isEditingNote: boolean = false;
  isInEditMode = {}
  newQuote: QuoteNote = null
  content: string

  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService,
    public dialog: MatDialog,
    private ngZone: NgZone
    
  ) {  }

  ngOnInit() {
  }

  editNote(noteId: string) {
    this.isInEditMode[noteId] = true
    this.autogrowTextareas()
  }

  saveNote(noteId: string) {
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
    this.newQuote = new QuoteNote()
  }

  saveNewNote() {
    this.reading.quoteNotes = this.reading.quoteNotes || [];
    this.newQuote.created = new Date();
    this.readingsService.addNoteToReading(this.reading , this.newQuote)

    this.newQuote = null
  }
}

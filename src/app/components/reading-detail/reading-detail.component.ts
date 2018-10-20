import { QuoteNote } from "src/app/models/quote-note";
import { NoteDialogComponent } from "./../note-dialog/note-dialog.component";
import { Reading } from "./../../models/reading";
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ReadingsService } from "../../services/readings.service";
import { MatDialog, MatCheckbox } from "@angular/material";
import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { AfterViewInit, ElementRef } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { ViewChild } from "@angular/core";
import { trigger } from "@angular/animations";
import { state } from "@angular/animations";
import { style } from "@angular/animations";
import { transition } from "@angular/animations";
import { animate } from "@angular/animations";
import { OnChanges } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
  selector: "lr-reading-detail",
  templateUrl: "./reading-detail.component.html",
  styleUrls: ["./reading-detail.component.scss"],
  animations: [
    trigger('fade-in', [
      state('done', style({
        opacity: 1
      })),
      state('none', style({
        opacity: 0
      })),
      transition('none => done', [
        animate('0.5s ease-in')
      ]),
      transition('done => none', [
        animate('0.2s')
      ])
    ])
  ]
})
export class ReadingDetailComponent implements OnInit, OnChanges {
  
  @Input() reading: Reading;
  @Input() isOwner: boolean;

  @Output() public deleteNote = new EventEmitter<string>();
  @Output() public updateReading = new EventEmitter<Reading>();

  isEditingNote: boolean = false;
  isInEditMode = {};
  newQuote: QuoteNote = null;
  content: string
  public currentState: string

  @ViewChild(MatCheckbox) isPrivateCheckBox: MatCheckbox;
  @ViewChild("focus") focusElement: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.currentState = 'done'
  }

  ngOnChanges(changes: SimpleChanges): void {
    // setTimeout( _ => this.currentState = 'none', 1)
    // setTimeout( _ => this.currentState = 'done', 1)
    this.currentState = 'done'
    if (!!changes.currentReading && !!changes.currentReading.currentValue) { 
      this.currentState = 'done'
      // setTimeout( _ => this.currentState = 'none', 1)
      // setTimeout( _ => this.currentState = 'done', 2)
    }
  }

  togglePrivate() {
    this.reading.isPrivate = !this.reading.isPrivate;
    this.isPrivateCheckBox.toggle();
    this.updateReading.emit(this.reading);
  }

  editNote(noteId: string) {
    this.isInEditMode[noteId] = true;
  }

  saveNote(noteId: string) {
    this.isInEditMode[noteId] = false;
    this.updateReading.emit(this.reading);
  }

  addNewNote() {
    this.newQuote = new QuoteNote();
  }

  saveNewNote() {
    this.reading.quoteNotes = this.reading.quoteNotes || [];
    this.newQuote.created = new Date();
    this.readingsService.addNoteToReading(this.reading, this.newQuote);

    this.newQuote = null;
  }
}

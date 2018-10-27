import { QuoteNote } from "src/app/models/quote-note";
import { NoteDialogComponent } from "./../note-dialog/note-dialog.component";
import { Reading } from "./../../models/reading";
import { Component, OnInit, SimpleChanges } from "@angular/core";
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
    trigger("fade-in", [
      state(
        "done",
        style({
          opacity: 1
        })
      ),
      state(
        "none",
        style({
          opacity: 0
        })
      ),
      transition("none => done", [animate("0.5s ease-in")]),
      transition("done => none", [animate("0.2s")])
    ])
  ]
})
export class ReadingDetailComponent implements OnInit, OnChanges {
  @Input()
  reading: Reading;
  @Input()
  isOwner: boolean;

  @Output()
  deleteReading = new EventEmitter();
  @Output()
  public deleteNote = new EventEmitter<string>();
  @Output()
  public updateReading = new EventEmitter<Reading>();

  newQuote: boolean = false;
  content: string;
  statuses: string[] = ["private", "published"];

  public currentState: string;

  @ViewChild(MatCheckbox)
  isPrivateCheckBox: MatCheckbox;

  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.currentState = "done";
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentState = "done";
    if (!!changes.currentReading && !!changes.currentReading.currentValue) {
      this.currentState = "done";
    }
  }

  changeStatus(status: string) {
    this.reading.status = status;
    this.updateReading.emit(this.reading);
  }

  saveNote(quoteNote: QuoteNote) {
    !!quoteNote.id
      ? this.updateReading.emit(this.reading) 
      : this.saveNewNote(quoteNote);
  }

  addNewNote() {
    this.newQuote = true

    this.reading.quoteNotes.push(new QuoteNote());
  }

  saveNewNote(newQuote: QuoteNote) {
    this.reading.quoteNotes = this.reading.quoteNotes || [];
    newQuote.created = new Date();
    this.readingsService.addNoteToReading(this.reading, newQuote);

    this.newQuote = false;
  }
}

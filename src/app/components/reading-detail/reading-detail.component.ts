import { NoteDialogComponent } from './../note-dialog/note-dialog.component';
import { QuoteNote } from './../../models/quote-note';
import { Reading } from "./../../models/reading";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReadingsService } from "../../services/readings.service";
import { MatDialog } from '@angular/material';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: "lr-reading-detail",
  templateUrl: "./reading-detail.component.html",
  styleUrls: ["./reading-detail.component.css"]
})
export class ReadingDetailComponent implements OnInit {
  
  @Input() reading: Reading

  @Output() 
  public deleteNote = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.reading.quoteNotes = this.reading.quoteNotes || []
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe( (quoteNote: QuoteNote) => {
      quoteNote.created = new Date();
      this.readingsService.addNoteToReading(this.reading, quoteNote)
    })
  }
}

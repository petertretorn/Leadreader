import { NoteDialogComponent } from './../note-dialog/note-dialog.component';
import { QuoteNote } from './../../models/quote-note';
import { Reading } from "./../../models/reading";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReadingsService } from "../../services/readings.service";
import { MatDialog } from '@angular/material';

@Component({
  selector: "lr-reading-detail",
  templateUrl: "./reading-detail.component.html",
  styleUrls: ["./reading-detail.component.css"]
})
export class ReadingDetailComponent implements OnInit {
  reading: Reading
  quoteNote: QuoteNote = new QuoteNote()


  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get("id");

      this.readingsService.getReading(id).subscribe(reading => {
        this.reading = reading;
        this.reading.quoteNotes = this.reading.quoteNotes || []
      });
    });
  }

  addQuoteNote() {
    
    this.quoteNote = new QuoteNote();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe( (quoteNote: QuoteNote) => {
      quoteNote.created = new Date();
      this.reading.quoteNotes.push(quoteNote);
    })
  }
}

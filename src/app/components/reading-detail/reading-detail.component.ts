import { NoteDialogComponent } from "./../note-dialog/note-dialog.component";
import { QuoteNote } from "./../../models/quote-note";
import { Reading } from "./../../models/reading";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReadingsService } from "../../services/readings.service";
import { MatDialog } from "@angular/material";
import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

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

  isEditingNote: boolean = false;

  isInEditMode = {}

  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService,
    public dialog: MatDialog
  ) {  }

  ngOnInit() {
    this.reading.quoteNotes = this.reading.quoteNotes || [];
  }

  editNote(noteId: string) {
    this.isInEditMode[noteId] = true
    this.autogrowTextareas(noteId)
  }

  saveNote(noteId: string) {
    this.isInEditMode[noteId] = false
    this.updateReading.emit(this.reading)
  }

  autogrowTextareas(noteId: string) {
    setTimeout(() => {
      let textAreas: HTMLTextAreaElement[] = Array.from(document.querySelectorAll('textarea.visible'));

      textAreas.forEach(textArea => {
        textArea.style.overflow = "hidden";
        textArea.style.height = "0px";
        textArea.style.height = textArea.scrollHeight + "px";
      });
    }, 1);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe((quoteNote: QuoteNote) => {
      if (!quoteNote) return;

      quoteNote.created = new Date();
      this.readingsService.addNoteToReading({ ...this.reading }, quoteNote);
    });
  }
}

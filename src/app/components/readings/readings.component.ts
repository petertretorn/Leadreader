import { tap } from "rxjs/operators";
import { take } from "rxjs/operators";
import { ReadersService } from "./../../services/readers.service";
import { Reader } from "./../../models/reader";
import { UserDialogComponent } from "./../user-dialog/user-dialog.component";
import { MatDialog, MatSnackBarRef, MatSnackBar, SimpleSnackBar } from "@angular/material";
import { AuthService } from "./../../services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Reading } from "./../../models/reading";
import { Observable } from "rxjs/internal/Observable";
import { ReadingsService } from "./../../services/readings.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { ReadingDetailComponent } from "../reading-detail/reading-detail.component";
import { FileService } from '../../services/file.service';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { Book } from '../../models/book';
import { environment } from "src/environments/environment";

@Component({
  selector: "lr-readings",
  templateUrl: "./readings.component.html",
  styleUrls: ["./readings.component.scss"]
})
export class ReadingsComponent implements OnInit, OnDestroy {
  @ViewChild(ReadingDetailComponent)
  readingDetailComponent: ReadingDetailComponent;

  readings: Reading[];
  reader: Reader;
  userId: string;
  currentReading: Reading = null;
  isDeleting: boolean = false;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService,
    private readersService: ReadersService,
    public auth: AuthService,
    private fileService: FileService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get("userId");

      this.readersService.getReader(this.userId).subscribe(reader => {
        this.reader = reader;
      });

      this.auth.reader$.subscribe(reader => {
        this.isOwner = this.userId === reader.uid;
        console.log('this.isOwner', this.isOwner)
      });

      this.readingsService
        .getReadingsForUser(this.userId)
        .pipe(take(1))
        .subscribe(readingsFirestore => {
          this.readings = readingsFirestore || []
          this.readings = (this.isOwner) ? this.readings : this.readings.filter(r => r.status === 'published')
          this.readings = this.readings.sort((r1, r2) => {
            return r1.dateCreated < r2.dateCreated ? 1 : -1;
          });

          this.currentReading = this.readings[0]
        });
    });
  }

  ngOnDestroy(): void {}

  editProfile(reader: Reader) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "500px",
      data: this.auth.reader
    });

    dialogRef.afterClosed().subscribe((reader: Reader) => {
      if (!!reader) {
        this.auth.updateUser(reader).then( _ => {});
      }
    });
  }

  deleteNote(noteId: string) {
    const snackBar: MatSnackBarRef<SimpleSnackBar> = this.openSnackbar("Sure to Delete?","DELETE", 1500);

    snackBar.onAction().subscribe(() => {
      this.currentReading.quoteNotes = this.currentReading.quoteNotes.filter(
        qn => qn.id !== noteId
      );
      this.readingsService.updateReading(this.currentReading);
    });
  }

  editReading(reading: Reading) {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: "340px",
      data: { book: reading.book }
    });

    dialogRef.afterClosed().subscribe((book: Book) => {
      if (book) {
        reading.book = book
        reading.book.imageUrl = reading.book.imageUrl || environment.defaultCover
        this.updateReading(reading)
      }
    });
  }

  deleteReading(reading: Reading) {
    const snackBar: MatSnackBarRef<SimpleSnackBar> = this.openSnackbar("Sure to Delete?","DELETE", 1500);

    snackBar.onAction().subscribe(() => {
      const isDeletingCurrent = reading.id === this.currentReading.id;

      if (isDeletingCurrent) {
        this.readingDetailComponent.currentState = "none";
      }

      if (!!reading.book.imageUrl && !!reading.book.imageName) {
        this.fileService.deleteFile(reading.book.imageName)
      }

      this.readingsService.deleteReading(reading).then(() => {
        this.isDeleting = false;
        this.readings = this.readings.filter(r => r.id !== reading.id);
        if (isDeletingCurrent) this.selectReading(this.readings[0], false);
      });

    });
  }

  openSnackbar(message: string, action: string, duration: number): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, { duration })
  }

  selectReading(reading: Reading, setToNone: boolean = true) {
    if (setToNone) this.readingDetailComponent.currentState = "none";
    setTimeout(_ => (this.currentReading = reading), 200);
  }

  updateReading(reading: Reading) {
    this.readingsService.updateReading(reading).then(_ => {});
  }
}

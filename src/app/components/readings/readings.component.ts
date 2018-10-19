import { take } from 'rxjs/operators';
import { ReadersService } from './../../services/readers.service';
import { Reader } from './../../models/reader';
import { UserDialogComponent } from "./../user-dialog/user-dialog.component";
import { MatDialog } from "@angular/material";
import { AuthService } from "./../../services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Reading } from "./../../models/reading";
import { Observable } from "rxjs/internal/Observable";
import { ReadingsService } from "./../../services/readings.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "lr-readings",
  templateUrl: "./readings.component.html",
  styleUrls: ["./readings.component.scss"]
})
export class ReadingsComponent implements OnInit {
  readings: Reading[]
  reader: Reader
  userId: string
  currentReading: Reading = null
  isDeleting: boolean = false
  isOwner: boolean = false

  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService,
    private readersService: ReadersService,
    private router: Router,
    public auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      
      this.userId = params.get("userId");

      this.readersService.getReader(this.userId).subscribe(reader => {
        this.reader = reader
      })

      this.auth.reader$.subscribe(reader => {
        this.isOwner = (this.userId === reader.uid)
      })

      this.readingsService.getReadingsForUser(this.userId).pipe(
        take(1)
      ).subscribe(readings => {
        this.readings = readings;
        console.log('getReadigsForUser')
        
        this.route.queryParams.subscribe(params => {
          const readingId = params["readingId"];
          this.currentReading =  (!!readingId) ? this.readings.filter(r => r.id === readingId)[0] : null
        });
      });

    });

    
  }

  editProfile(reader: Reader) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "500px",
      data: this.auth.reader
    });

    dialogRef.afterClosed().subscribe((reader: Reader) => {
      if (!!reader) {
        this.auth.updateUser(reader).then(res => console.log("usesr updated"));
      }
    });
  }

  deleteNote(noteId: string) {
    this.currentReading.quoteNotes = this.currentReading.quoteNotes.filter(
      qn => qn.id !== noteId
    );
    this.readingsService.updateReading(this.currentReading);
  }

  deleteReading(reading: Reading) {
    this.currentReading = null;

    this.readingsService
      .deleteReading(reading)
      .then(() => (this.isDeleting = false));
  }

  selectReading(reading: Reading) {
    this.currentReading = reading
  }

  updateReading(reading: Reading) {
    this.readingsService.updateReading(reading).then( _ => {
      this.selectReading(reading)
    })
  }
}

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
  currentReading: Reading = null
  isDeleting: boolean = false
  isOwner: boolean = false

  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService,
    private router: Router,
    public auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = params.get("userId");

      this.isOwner = (userId === this.auth.readerId)

      this.readingsService.getReadigsForUser(userId).subscribe(readings => {
        this.readings = readings;

        this.route.queryParams.subscribe(params => {
          const readingId = params["readingId"];

          if (!!readingId) {
            this.currentReading = this.readings.filter(
              r => r.id === readingId
            )[0];
          }
        });
      });
    });
  }

  editProfile() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "500px",
      data: this.auth.reader
    });

    dialogRef.afterClosed().subscribe((user: Reader) => {
      if (!!user) {
        this.auth.updateUser(user).then(res => console.log("usesr updated"));
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
    this.readingsService.updateReading(reading);
  }
}

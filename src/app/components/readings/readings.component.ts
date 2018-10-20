import { tap } from 'rxjs/operators';
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
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ReadingDetailComponent } from '../reading-detail/reading-detail.component';

@Component({
  selector: "lr-readings",
  templateUrl: "./readings.component.html",
  styleUrls: ["./readings.component.scss"]
})
export class ReadingsComponent implements OnInit, OnDestroy {
  
  @ViewChild(ReadingDetailComponent) readingDetailComponent: ReadingDetailComponent

  readings: Reading[]
  reader: Reader
  userId: string
  currentReading: Reading = null
  isDeleting: boolean = false
  isOwner: boolean = false
  subscriptions: Subscription[] = []

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

      const subscription = this.readingsService.getReadingsForUser(this.userId).pipe(
        take(1)
      ).subscribe(readings => {
        this.readings = readings.sort( (r1, r2) => {
          return (r1.dateCreated < r2.dateCreated) ? 1 : 0 
         } )

         this.currentReading = this.readings[0]
      });

      this.subscriptions.push(subscription)

    });
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
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
    const isDeletingCurrent = (reading.id === this.currentReading.id);

    if (isDeletingCurrent) {
      this.readingDetailComponent.currentState = 'none'
      console.log('isDeletingCurrent')
    }

    this.readingsService
      .deleteReading(reading)
      .then(() => {
        this.isDeleting = false
        this.readings = this.readings.filter(r => r.id !== reading.id)
        if (isDeletingCurrent) this.selectReading(this.readings[0], false)
      });
  }

  selectReading(reading: Reading, setToNone: boolean = true) {
    console.log('selectReading')
    if (setToNone) this.readingDetailComponent.currentState = 'none'
    setTimeout( _ => this.currentReading = reading, 200)
  }

  updateReading(reading: Reading) {
    this.readingsService.updateReading(reading).then( _ => {
    })
  }
}

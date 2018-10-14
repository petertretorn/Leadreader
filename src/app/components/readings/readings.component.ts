import { User } from './../../models/user';
import { UserDialogComponent } from './../user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Reading } from './../../models/reading';
import { Observable } from 'rxjs/internal/Observable';
import { ReadingsService } from './../../services/readings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lr-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.css']
})
export class ReadingsComponent implements OnInit {
  
  readings: Reading[]
  currentReading: Reading = null

  constructor(
    private route: ActivatedRoute,
    private readingsService: ReadingsService, 
    private router: Router,
    public auth: AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = params.get("userId");

      this.readingsService.getReadigsForUser(userId).subscribe(readings => {
        this.readings = readings
      })
    })
  }

  editProfile() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: this.auth.user
    });

    dialogRef.afterClosed().subscribe( (user: User) => {
      if (!!user) {
        this.auth.updateUser(user).then(res => console.log('usesr updated'))
      }
    })
  }

  deleteNote(noteId: string) {
    console.log('deleteNote')
    this.currentReading.quoteNotes = this.currentReading.quoteNotes.filter(qn => qn.id !== noteId)
    this.readingsService.updateReading(this.currentReading)
  }

  updateReading(reading: Reading) {
    this.readingsService.updateReading(reading)
  }

}

import { User } from './../../models/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'lr-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) {
      this.user = user
    }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.user)
  }

  cancel() {
    this.dialogRef.close(null)
  }
}

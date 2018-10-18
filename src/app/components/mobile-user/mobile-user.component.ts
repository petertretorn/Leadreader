import { MatDialog } from '@angular/material';
import { Reader } from './../../models/reader';
import { UserDialogComponent } from './../user-dialog/user-dialog.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lr-mobile-user',
  templateUrl: './mobile-user.component.html',
  styleUrls: ['./mobile-user.component.scss']
})
export class MobileUserComponent implements OnInit {

  constructor(public auth: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  editProfile() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "340px",
      data: this.auth.reader
    });

    dialogRef.afterClosed().subscribe((user: Reader) => {
      if (!!user) {
        this.auth.updateUser(user).then(res => console.log("usesr updated"));
      }
    });
  }
}

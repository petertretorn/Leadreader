import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { NgZone } from "@angular/core";

@Component({
  selector: "lr-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  image: string = "../../assets/books.jpg";

  constructor(private router: Router, private authService: AuthService, private ngZone: NgZone) {}

  ngOnInit() {}

  joinWithGoogle() {
    this.authService.googleLogin().then(res => {
      console.log("logged in google, res");
      
      this.ngZone.run( () => {
        this.router.navigate(['../app/search-book']);
      })
      
    });
  }
}

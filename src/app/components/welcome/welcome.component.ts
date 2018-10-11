import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lr-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  image: string = '../../assets/books.jpg'

  constructor(private router: Router) { }

  ngOnInit() {
  }

  join() {
    console.log('clicking')
    this.router.navigate(['/app/']);
  }
}

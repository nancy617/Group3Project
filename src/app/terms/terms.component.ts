import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
})
export class TermsComponent implements OnInit {
  isReadMore = true

  showText() {
     this.isReadMore = !this.isReadMore
  }
 
  constructor() {}

  ngOnInit(): void {}
}

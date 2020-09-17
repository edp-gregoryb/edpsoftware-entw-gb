/*
  Header der Applikation
*/
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input() headerTitle: string; //titel der momentanen ansicht
  @Input() linkBack:    string; //zurueck-link
  @Input() queryparam: string;


  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  //navigiert ein link zurueck
  navigate(){
    if (this.queryparam) {
      this.router.navigate([this.linkBack], {queryParams: {elm: this.queryparam}});
    } else {
      this.router.navigate([this.linkBack],  {queryParams : { elm: 'idb'}});
    }

  }
}

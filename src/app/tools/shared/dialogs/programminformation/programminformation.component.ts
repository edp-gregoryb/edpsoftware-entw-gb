import { Component, OnInit } from '@angular/core';


import * as pageMarkdown from 'raw-loader!assets/CHANGELOG.md';

@Component({
  selector: 'app-programminformation',
  templateUrl: './programminformation.component.html',
  styleUrls: ['./programminformation.component.css']
})
export class ProgramminformationComponent implements OnInit {

  buildVersion: string;
  constructor() { }

  ngOnInit() {
    this.buildVersion = pageMarkdown.default;
    console.log('Version', pageMarkdown.default);
  }


}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { WindowrefService } from '../../comm/windowref.service';

@Component({
  selector: 'app-terminviewdialog',
  templateUrl: './terminviewdialog.component.html',
  styleUrls: ['./terminviewdialog.component.css']
})
export class TerminviewdialogComponent implements OnInit {
param1:string;
nativeWindow:any;
  constructor(public dialogRef: MatDialogRef<any>, private winref:WindowrefService) { 
    this.nativeWindow = this.winref.getNativeWindow();
  }

  ngOnInit() {
  }

  openTermindetail(){
    console.log("test");
    var newWindow = this.nativeWindow.open('/termin/list-show');
  }

}

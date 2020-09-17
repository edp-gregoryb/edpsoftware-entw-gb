import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-discardworkflowdialog',
  templateUrl: './discardworkflowdialog.component.html',
  styleUrls: ['./discardworkflowdialog.component.css']
})
export class DiscardworkflowdialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DiscardworkflowdialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

}

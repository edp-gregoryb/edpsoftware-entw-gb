import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteworkflowdialog',
  templateUrl: './deleteworkflowdialog.component.html',
  styleUrls: ['./deleteworkflowdialog.component.css']
})
export class DeleteworkflowdialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteworkflowdialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

}

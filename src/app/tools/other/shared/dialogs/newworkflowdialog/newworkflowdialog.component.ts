import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-newworkflowdialog',
  templateUrl: './newworkflowdialog.component.html',
  styleUrls: ['./newworkflowdialog.component.css']
})
export class NewworkflowdialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewworkflowdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
  }

}

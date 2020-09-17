import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteobjectdialog',
  templateUrl: './deleteobjectdialog.component.html',
  styleUrls: ['./deleteobjectdialog.component.css']
})
export class DeleteobjectdialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteobjectdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
  }

}

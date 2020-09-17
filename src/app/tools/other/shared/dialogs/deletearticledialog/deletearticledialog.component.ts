import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deletearticledialog',
  templateUrl: './deletearticledialog.component.html',
  styleUrls: ['./deletearticledialog.component.css']
})
export class DeletearticledialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeletearticledialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

}

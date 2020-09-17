
/*
  Stellt Hilfs-Modale dar
*/

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-helpdialog',
  templateUrl: './helpdialog.component.html',
  styleUrls: ['./helpdialog.component.css']
})
export class HelpdialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<HelpdialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    //wenn falsche oder keine daten vorhanden sind -> modal schliessen
    if(!this.data || this.data.helpindex === undefined || this.data.helpindex === null || this.data.helpindex < 0) {
      //timeout fuer 0 millisekunden, sodass error vermieden wird
      setTimeout(() => {
        this.dialogRef.close();
      }, 0);
    }
  }
}

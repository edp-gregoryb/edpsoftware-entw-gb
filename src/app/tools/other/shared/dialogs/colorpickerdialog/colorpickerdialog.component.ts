
/*
  Color-Picker-Dialog, wie der name schon sagt
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-colorpickerdialog',
  templateUrl: './colorpickerdialog.component.html',
  styleUrls: ['./colorpickerdialog.component.css']
})
export class ColorpickerdialogComponent implements OnInit {
  
  //vorlage-farben
  public defaultColors: string[] = [
    '#ffffff',
    '#3e6158',
    '#3f7a89',
    '#91ad5a',
    '#96c582',
    '#b7d5c4',
    '#bcd6e7',
    '#7c90c1',
    '#9d8594',
    '#dad0d8',
    '#4b4fce',
    '#4e0a77',
    '#a367b5',
    '#ee3e6d',
    '#d63d62',
    '#c6a670',
    '#f46600',
    '#cf0500',
    '#efabbd',
    '#8e0622',
    '#f0b89a',
    '#f0ca68',
    '#62382f',
    '#c97545',
    '#c1800b'
  ];
  
  //default-farbe
  color: string = "#ffffff";
  
  constructor(public dialogRef: MatDialogRef<ColorpickerdialogComponent>) { }

  ngOnInit() {
  }
  
  //farb wechsel per klick
  changeColor(color: string) {
    this.color = color;
  }
  
  //farb wechsel manuel
  changeColorManual(color: string) {
    //valid hex-farbe?
    const isValid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
  
    if (isValid) {
      this.color = color;
    }
  }
}

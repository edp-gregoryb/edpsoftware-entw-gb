import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-objektcontainersection',
  templateUrl: './objektcontainersection.component.html',
  styleUrls: ['./objektcontainersection.component.css']
})
export class ObjektcontainersectionComponent implements OnInit {

  @Input() step: any;
  @Input() article: any;

  @Input() stepsunlocked:        any;
  @Input() taskprogress:         any;
  @Input() ausserindex: number;
  @Input() jindex: number;

  @Output() sectionPosition = new EventEmitter();
  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.sectionPosition.emit({  position: this.element.nativeElement.offsetTop });
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    // prevent default scrolling
    event.preventDefault();


    console.log('targetCard', event)

  }

  //gibt hintergrundfarbe eines tasks zurueck
  getBackgroundColor(i, j, p) {
    let prg = this.taskprogress[i][j][p];
    if(prg === 1){
      //task abgeschlossen -> Gruen
      return 'rgba(44, 209, 41, 0.6)';
    } else if(prg < 1 && prg > 0){
      //task unvollstaendig -> Orange
      return 'rgba(239, 147, 47, 0.6)';
    }
    //task noch nicht begonnen -> Fast weiss
    return 'rgb(241, 241, 241)';
  } //ende getBackgroundColor()

  getElement() {
    console.log("test")
    this.sectionPosition.emit({  position: this.element.nativeElement });
  }
}

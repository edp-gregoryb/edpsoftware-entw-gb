import {Component, OnInit, Input, ElementRef, Directive, ViewChildren, QueryList, HostListener, Output, EventEmitter} from '@angular/core';
import {Product} from '../../entities/Product';


@Directive({
  selector: '[itemObject]'
})
export class ItemObjectDirective {
  constructor(private elementRef: ElementRef<HTMLElement>) { };
  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView(true);
  }
}

@Component({
  selector: 'app-objekctcontainer',
  templateUrl: './objekctcontainer.component.html',
  styleUrls: ['./objekctcontainer.component.css']
})
export class ObjekctcontainerComponent implements OnInit {


  @Input() article: any;
  @Input() ausserindex: any;

  @Input() stepsunlocked:        any;
  @Input() taskprogress:         any;
  @Output() cardPosition = new EventEmitter();
  product:              Product;
  httpRequestsLoading:  number    = 0;
  minwidth: number;


  constructor(private elementRef: ElementRef<HTMLElement>, private element: ElementRef) { }

  ngOnInit() {


  }

  public scroll(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
      // prevent default scrolling
      event.preventDefault();


      console.log('targetCard', event)

  }
  getElement() {
    console.log("test")
    this.cardPosition.emit({  position: this.element.nativeElement });
  }


  sectionPosition($event: any) {
    //console.log("position", $event)
  }
}

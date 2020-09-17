

import {Component, OnInit, ElementRef,  EventEmitter, HostListener,Input,Output, OnChanges} from '@angular/core';

@Component({
    selector: 'sectioncontainer',
    templateUrl: './sectioncontainer.component.html',
    styleUrls: ['./sectioncontainer.component.css']
  
})
export class SectioncontainerComponent implements OnInit {

    @Output() sectionPosition = new EventEmitter();
    @Input()  content: any;
    @Input() scroll:any;

    constructor(private element: ElementRef) {}

    ngOnInit() {
        this.sectionPosition.emit({ termdatum: this.content.termdatum, position: this.element.nativeElement.offsetTop });
    }

    // ngOnChanges() {
    //     if (this.scroll){
    //         console.log("section element ngChange")
    //         this.sectionPosition.emit({ name: this.content.name, position: this.element.nativeElement.offsetTop });
    //     }
       

    // }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        //console.log("window:resize",this.element.nativeElement.offsetTop) 
      this.sectionPosition.emit({ termdatum: this.content.termdatum, position: this.element.nativeElement.offsetTop });
    }

    // @HostListener('window:resize', ['$event'])
    // onResize(event) {
    //     console.log("event section", event);
    //   this.sectionPosition.emit({ termdatum: this.content.termdatum, position: this.element.nativeElement.offsetTop });
    // }

}
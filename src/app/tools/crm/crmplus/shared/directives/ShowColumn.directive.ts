import {Component, Directive, ElementRef, Input, AfterViewInit} from '@angular/core';
@Directive({ 
     selector: '[showCoulmn]' 
})
export class ShowColumnDirective implements AfterViewInit{
    @Input() showInput: string;
    constructor(private elRef: ElementRef) { 
    }
    ngAfterViewInit(): void {
    this.elRef.nativeElement.style.display = this.showInput;
    }
}
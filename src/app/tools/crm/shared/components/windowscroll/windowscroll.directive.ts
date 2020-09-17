import {Directive, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
@Directive({
  selector: '[Windowscroll]'
})
export class WindowscrollDirective implements OnInit, OnDestroy {
  @Output() Windowscroll = new EventEmitter<null>();
  
  private scroll = (event: any) => {
    this.Windowscroll.emit(null);
  }
  
  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }
  
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
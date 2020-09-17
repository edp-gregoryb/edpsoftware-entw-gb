import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'showAuftragsIcon'
})
export class ShowAuftragsIconPipe implements PipeTransform {

  constructor(protected _sanitizer: DomSanitizer){}
  transform(data: string, type: string): SafeHtml{
    if (data === "01" && type === 'html'){
      	return this._sanitizer.bypassSecurityTrustHtml('<mat-icon mat-list-icon>play_circle_filled</mat-icon>');

    } else if (data === "02" && type === 'html'){
      return this._sanitizer.bypassSecurityTrustHtml('<mat-icon mat-list-icon>play_circle_outline</mat-icon>');
    } else if (data === "04" && type === 'html'){
      return this._sanitizer.bypassSecurityTrustHtml('<mat-icon mat-list-icon>hourglass_empty</mat-icon>');
    } else if (data === "10" && type === 'html'){
      return this._sanitizer.bypassSecurityTrustHtml('<mat-icon mat-list-icon>play_circle_outline</mat-icon>');
    }

  }

}

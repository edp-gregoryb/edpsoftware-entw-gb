import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'showIcon'
})
export class ShowIconPipe implements PipeTransform {

  constructor(protected _sanitizer: DomSanitizer){}
  transform(data: string, type: string): SafeHtml{
    //console.log("showiconpipe", data);
    if (data === "TE" && type === 'html'){
      	return this._sanitizer.bypassSecurityTrustHtml('<mat-icon mat-list-icon>&#xE0B0;</mat-icon>');

    } else if (data === "BE" && type === 'html'){
      return this._sanitizer.bypassSecurityTrustHtml('<mat-icon mat-list-icon>group</mat-icon>');
    } else if (data === "EM" && type === 'html'){
      return this._sanitizer.bypassSecurityTrustHtml('<mat-icon mat-list-icon>mail</mat-icon>');
    } else if (data === "AU" && type === 'html'){
      return this._sanitizer.bypassSecurityTrustHtml('<mat-icon mat-list-icon>insert_invitation</mat-icon>');
    } else if (data === "TE"  && type === 'html') {
      return this._sanitizer.bypassSecurityTrustHtml('<mat-icon mat-list-icon>&#xE0B0;</<mat-icon>');
    }

  }

}

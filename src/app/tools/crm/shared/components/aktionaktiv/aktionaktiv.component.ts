import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../../comm/common.service';
import { WindowrefService } from '../../comm/windowref.service';

@Component({
  selector: 'app-aktionaktiv',
  templateUrl: './aktionaktiv.component.html',
  styleUrls: ['./aktionaktiv.component.css']
})
export class AktionaktivComponent implements OnInit {
  private subscription: Subscription;
  aktivterm:boolean = false;
  terminitem:any;
  nativeWindow: any
  constructor(private commonService: CommonService,private winRef: WindowrefService) {
    this.nativeWindow = winRef.getNativeWindow();
    
  }

  ngOnInit() {
    this.subscription = this.commonService.notify16Observable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'aktivitem') {
       // console.log("aktivitem", res.value,res.value1);
        if (res.value1){
          this.terminitem = res.value1.NAME;
          this.aktivterm = res.value;
        } else {
          this.aktivterm = false;
        }
        
       
      
      }
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  openAgenda(event){
    // console.log("openAgenda",event);
    //var newWindow = this.nativeWindow.open('/agendaview/agenda-show');
    // this.router.navigate(['/agendaview/agenda-show']);
  }
 
}

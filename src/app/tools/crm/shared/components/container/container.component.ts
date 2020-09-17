import {
    Component,
    OnInit,
    Input,
    OnChanges,
    ElementRef,
    HostListener,
    Inject,
    Output,
    EventEmitter,
    AfterViewInit,
    ViewChild
} from '@angular/core';
import {SectioncontainerComponent} from '../sectioncontainer/sectioncontainer.component';
import { DOCUMENT } from "@angular/common";
import {Router} from '@angular/router';
import {CommonService} from '../../comm/common.service';
import {DocumentIndex} from 'ndx';
import {element} from 'protractor';


@Component({
    selector: 'container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css'] 
})
export class ContainerComponent implements OnChanges {

    //public currentSectionName: string = null;
    private sectionsIndex: any = [];
    @Input()  sections: any;
    @Input() scroll: any;
    @Output() auswahl = new EventEmitter();

    @ViewChild('containerlist', { static: false }) containerlist: ElementRef;
    // @ViewChild('scrolll', { read: ElementRef }) public scrolll: ElementRef<any>;
    kundenshow: boolean;

    tempSections: any;

    constructor( private el: ElementRef,@Inject(DOCUMENT) private document: Document, private router: Router,
                 private commObserver: CommonService) {

        if (this.router.url !== '/agendaview/agendaitems-show' && this.router.url !== '/projektview/projekte-show') {
           this.kundenshow = true;
        }
    }

    ngOnChanges() {
        console.log("section input", this.sections);
        if (this.scroll){
            console.log("scroll window",scroll);
            //this.currentSectionName = this.getCurrentSectionName();
        }

        this.tempSections = this.sections;
    }

    sectionPosition($event) {
        //filter out the old position if it has been set
        this.sectionsIndex = this.sectionsIndex.filter(item => item.termdatum != $event.termdatum);
        //set the new position
        this.sectionsIndex.push($event);
        //sort the section based on their apperance order 
        this.sectionsIndex.sort((a: any, b: any) => {
            return b.position - a.position;
        });
        
        /*//if the page has already been scrolled find the current name
        if (document.body.scrollTop > 0) {
            this.currentSectionName = this.getCurrentSectionName();
        }*/
    }
    
    anzTermine(index){
        let i = index;
        let counter = 0;
        while(this.sections[index].termdatum === this.sections[i].termdatum){
            counter++;
            if(this.sections[i-1] !== undefined){
                i--;
            } else {
                return counter;
            }
        }
        return counter;
    }
    

    /*private getCurrentSectionName(): string {
        let offset: number = this.el.nativeElement.parentElement.offsetTop - this.el.nativeElement.offsetTop;
        console.log("this.sectionsIndex",this.sectionsIndex);
        for (let section of this.sectionsIndex) {
            //Note: 13px is the margin-top value of the h2 element in the header
            // console.log("section.position",section.position);
            // console.log("offset",offset);
            //var intElemOffsetHeight = element.offsetHeight;
             console.log("window.scrollY ",this.scroll.target.scrollTop);
            console.log("section.name",section.termdatum);
            console.log("section",section.position + offset - this.scroll.target.scrollTop - 100);
            if ((section.position + offset - this.scroll.target.scrollTop - 80) < 0) {
                return section.termdatum;
               
            }
        }
        return null;
    }*/

    onclick(event:Event,button:string,termine,overlaypanel,index) {
        //sessionStorage.setItem('VEAGscroll', this.scroll.target.scrollTop);
        console.log("termine " + JSON.stringify(termine));
        let auswahljson = {"termin": termine, "index": index};
        this.auswahl.emit(auswahljson);
        console.log("onclick",event,button,termine,overlaypanel,index);
    }

    addTermin() {
        let kundenquerysave = sessionStorage.getItem('KundenSuche');
        if (kundenquerysave) {
            let kundenqueryresult = JSON.parse(kundenquerysave);
            let json = JSON.parse(kundenqueryresult.value);
            console.log("kundenqueryresult", json[0]);
             this.commObserver.notifyOther14({ option: 'neuerTermin1', value: true, kunde: json[0] });
        }
    }

    // searchItems(event) {
    //     // console.log('this.tempSections', this.tempSections);
    //     if (!event) {
    //         // console.log('this.tempSections', this.tempSections);
    //         this.sections = this.tempSections;
    //     } else {
    //         console.log("searchItems", event);
    //         this.itemauswahl = this.sections;
    //         const index = new DocumentIndex();
    //         index.addField("NAME");
    //         index.addField("termkontaktpers");
    //         index.addField("objekt");
    //         index.addField("rubrik");
    //         index.addField("termdatum");
    //         index.addField("termrapptext");
    //         index.addField("vertr_name");
    //         this.itemauswahl.forEach((doc) => {
    //             index.add(doc, doc);
    //         });
    //         var obj = index.search(event);
    //         // console.log("index",obj);
    //
    //         var tempjsonArray = [];
    //         for (var i = 0; i <= obj.length - 1; i++) {
    //             tempjsonArray.push(obj[i].docId);
    //         }
    //         this.sections = tempjsonArray;
    //     }
    //
    //
    // }

    // goBack() {
    //
    //     // let elem = document.getElementById('40');
    //     // let topPos = elem.offsetTop;
    //     // console.log('containerlist', topPos);
    //     // this.scrollTo(document.getElementById('containerlist'), topPos - 30, 600);
    //     console.log(this.scrolll.nativeElement.scrollTop);
    //     this.scrolll.nativeElement.scrollTop = this.scrolll.nativeElement.scrollHeight;
    // }
    //
    // scrollTo(elem, to, duration) {
    //     var start = elem.scrollTop,
    //         change = to - start,
    //         currentTime = 0,
    //         increment = 20;
    //
    //     var animateScroll = () => {
    //         currentTime += increment;
    //         let val = this.easeInOutQuad(currentTime, start, change, duration);
    //         console.log('scrollto2', val)
    //         // this.containerlist.nativeElement.scrollTop = (Number(val));
    //          console.log('elem.scrollTop', this.containerlist.nativeElement.value)
    //         if (currentTime < duration) {
    //             setTimeout(animateScroll, increment);
    //         }
    //     };
    //
    //
    //
    //     animateScroll();
    // }
    //
    //  easeInOutQuad(t, b, c, d) {
    //     t /= d/2;
    //     if (t < 1) return c/2*t*t + b;
    //     t--;
    //     return -c/2 * (t*(t-2) - 1) + b;
    // }


}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from '../../shared/entities/Product';
import {RestObjektService} from '../../shared/rest-services/rest-objekt.service';
import {RestProduktService} from '../../shared/rest-services/rest-produkt.service';
import {NodeServiceService} from '../../shared/rest-services/node-service.service';


@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {

  httpRequestsLoading: number   = 0;

  productoutput: any;
  products: Product[] = [];

  constructor(private restObjService: RestObjektService, private restProduktService: RestProduktService,
              private nodeService: NodeServiceService) {



  }

  ngOnInit() {



  }

  public  getAllObjekte() {
    // let products: Product[] = [];
    let anzeigeProducts: Array<any> = [];
    this.httpRequestsLoading++;
    this.restObjService.objAbfrage('')
        .subscribe( allObjects => {
          this.httpRequestsLoading--;
          console.log('allObjects', allObjects);
          //fuer jedes objekt
          var counter = 0;
          for (let i = 0; i < allObjects.length; i++){
            //alle produkte dieses objektes abfragen
            this.httpRequestsLoading++;
            this.restProduktService.getAllProdukt(allObjects[i].objekt)
                .subscribe( tempProducts => {
                  this.httpRequestsLoading--;
                  //fuer alle produkte
                  console.log("tempProducts.length",tempProducts.length)

                  if (tempProducts.length >= 1){
                    anzeigeProducts.push(tempProducts[0]);
                    sessionStorage.setItem('anzeigeProducts', JSON.stringify(anzeigeProducts))
                  }

                  for (let j = 0; j < tempProducts.length; j++){
                    this.products.push(tempProducts[j]);
                    sessionStorage.setItem('tempProducts', JSON.stringify(this.products))

                    counter ++;
                  }
                  // let sst = sessionStorage.getItem('tempProducts');
                  // let sstJson = JSON.parse(sst);
                  // let productsout = sstJson.sort((a, b) => (a.aschlussel > b.aschlussel) ? 1 : -1);
                  // console.log("productsout", productsout);
                  // this.productoutput = productsout;


                }, err => {
                  console.log(err);
                });
          }
        }, err => {
          console.log(err);

        });


  }
}

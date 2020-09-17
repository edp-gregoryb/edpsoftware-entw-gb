/*
  Anzeigen einer Adresse in OpenStreetMap mit Hilfe von OpenLayers
*/

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http'

declare var ol: any; //openLayers

@Component({
  selector: 'app-openstreetmap',
  templateUrl: './openstreetmap.component.html',
  styleUrls: ['./openstreetmap.component.css']
})
export class OpenstreetmapComponent implements OnInit {
  @Input() strasse: string;
  @Input() ort: string;
  map: any;
  
  showProgressBar:boolean = false;
  
  constructor(private http: HttpClient) {
  }
  
  ngOnInit() {
    //ladebalken anzeigen
    this.showProgressBar = true;
    //Neue map wird initialisiert (ausgerichtet auf die ganze Schweiz)
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([8.27931550975395, 47.0349865]), //ca schweiz zentrum
        zoom: 7 //so dass die ganze schweiz gesehen wird
      })
    });
    console.log(this.strasse + ", " + this.ort);
    
    //mithilfe der strasse und des ortes werden die Koordinaten geocoded/herausgefunden
    var nominatimURL = 'https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(this.strasse) + '%20' + encodeURIComponent(this.ort) + '&format=json&polygon=1&addressdetails=1';
    this.http.get(nominatimURL)
      .subscribe(data => {
        //map updaten
        this.setMap(data);
        //ladebalken ausschalten
        this.showProgressBar = false;
      }, error => {
        this.showProgressBar = false;
      }
    );
  }
  
  ngOnChanges(){
    if(this.map){
      //ladebalken anzeigen
      this.showProgressBar = true;
      
      //neue koordinaten suchen per http-request
      var nominatimURL = 'https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(this.strasse) + '%20' + encodeURIComponent(this.ort) + '&format=json&polygon=1&addressdetails=1';
      this.http.get(nominatimURL)
        .subscribe(data => {
          //map updaten
          this.setMap(data);
          //ladebalken ausschalten
          this.showProgressBar = false;
        }, error => {
          this.showProgressBar = false;
        }
      );
    }
  }
  
  //updated die map und erstellt marker
  setMap(data){
    var added = false;
    var found = false;
    if(data){
      if(data[0]){
        data = data[0];
        if(data.lon && data.lat){
          found = true;
          //aus den daten werden die koordinaten herausgelesen und die map auf diese koordinaten gezoomt
          let view = this.map.getView();
          view.setCenter(ol.proj.fromLonLat([Number(data.lon), Number(data.lat)]));
          view.setZoom(17);
          
          //marker wird erstellt und auch auf die richtigen koordinaten gesetzt
          var marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([Number(data.lon), Number(data.lat)]))
          });
          
          //marker style bestimmen (bild, groesse,...)
          marker.setStyle(new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
              crossOrigin: 'anonymous',
              src: '../../../../../../assets/marker.png',
              scale: 0.08
            }))
          }));
          
          //marker wird der map hinzugefuegt
          var vectorSource = new ol.source.Vector({
            features: [marker]
          });
          
          var vectorLayer = new ol.layer.Vector({
            source: vectorSource
          });
          
          //marker wird der map hinzugefügt
          let layers = this.map.getLayers();
          if(added){
            layers.pop();
          }
          layers.push(vectorLayer);
          added = true;
        } else {
          console.log("Keine Koordinaten gefunden");
        }
      } else {
        console.log("HTTP-Request beinhaltet keine Daten");
      }
    } else {
      console.log("HTTP-Request ergibt kein Ergebnis");
    }
    
    //falls keine koordinaten zu der adresse gefunden werden wird wieder auf die ganze Schweiz gezoomt
    if(!found){
      let view = this.map.getView();
      view.setCenter(ol.proj.fromLonLat([8.27931550975395, 47.0349865]));
      view.setZoom(7);
      if(added){
        let layers = this.map.getLayers();
        layers.pop();
        added = false;
      }
    }
  }
}

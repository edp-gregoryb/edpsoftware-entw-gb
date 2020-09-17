/*
import { Component, OnInit, Input, ViewChild, NgZone, OnChanges } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { } from 'googlemaps';


declare var google: any;

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

interface Location {
    lat: number;
    lng: number;
    viewport?: Object;
    zoom: number;
    address_level_1?: string;
    address_level_2?: string;
    address_country?: string;
    address_zip?: string;
    address_state?: string;
    marker?: Marker;
}


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})




export class MapComponent implements OnInit {
    @Input() strasse: string;
    @Input() ort: string;

    geocoder: any;

    public location: Location = {
        lat: 51.678418,
        lng: 7.809007,
        marker: {
            lat: 51.678418,
            lng: 7.809007,
            draggable: true
        },
        zoom: 5
    };

    @ViewChild(AgmMap) map: AgmMap;

    constructor(private mapsApiLoader: MapsAPILoader,
        private zone: NgZone,
        private wrapper: GoogleMapsAPIWrapper) {
        this.mapsApiLoader = mapsApiLoader;
        this.zone = zone;
        this.wrapper = wrapper;
        

        }

    ngOnInit() {
       
    }

    ngOnChanges(){
        console.log("this.ort+','+this.strasse",this.ort+','+this.strasse);
        this.findLocation(this.ort+','+this.strasse);
    }

    markerDragEnd(val){

    }

    findLocation(address) {
        this.mapsApiLoader.load().then(() => {
        if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({
            'address': address
        }, (results, status) => {
            console.log(results);
            if (status == google.maps.GeocoderStatus.OK) {
                for (var i = 0; i < results[0].address_components.length; i++) {
                  let types = results[0].address_components[i].types
                 // console.log(types);
                  if (types.indexOf('locality') != -1) {
                    this.location.address_level_2 = results[0].address_components[i].long_name
                  }
                  if (types.indexOf('country') != -1) {
                    this.location.address_country = results[0].address_components[i].long_name
                  }
                  if (types.indexOf('postal_code') != -1) {
                    this.location.address_zip = results[0].address_components[i].long_name
                  }
                  if (types.indexOf('administrative_area_level_1') != -1) {
                    this.location.address_state = results[0].address_components[i].long_name
                  }
                }
                if (results[0].geometry.location) {
                  this.location.lat = results[0].geometry.location.lat();
                  this.location.lng = results[0].geometry.location.lng();
                  this.location.marker.lat = results[0].geometry.location.lat();
                  this.location.marker.lng = results[0].geometry.location.lng();
                  this.location.marker.draggable = true;
                  this.location.viewport = results[0].geometry.viewport;
                }

                this.map.triggerResize()
            } else {
                console.log("Sorry, this search produced no results.");
            }
        })
    })
    }

}*/
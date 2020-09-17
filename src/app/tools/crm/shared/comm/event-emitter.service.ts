import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventEmitterService {
  private static _emitters: { [ID: string]: EventEmitter<any> } = {};
  constructor() { }
  static get(ID: string): EventEmitter<any> {
     console.log("eventemitter",this._emitters, ID );
    if (!this._emitters[ID]) 
      this._emitters[ID] = new EventEmitter();
    return this._emitters[ID];
  }
}

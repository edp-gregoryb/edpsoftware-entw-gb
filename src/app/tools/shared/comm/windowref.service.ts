import { Injectable } from '@angular/core';

@Injectable()
export class WindowrefService {

  constructor() { }

  getNativeWindow() {
        return window;
    }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private taxInfo = new Subject<{}>();

  constructor() { }

  public getTaxInfo(): Observable<{}> {
    return this.taxInfo.asObservable();
  }

  public setTaxInfo(value: {}) {
    this.taxInfo.next(value);
    // return this.taxInfo.next(value);
  }

}

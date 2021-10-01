import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataShareService } from '../shared/data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  public isVeg = new BehaviorSubject<boolean>(false);
  public taxAmt = new BehaviorSubject<number>(0);
  public taxInfo: any;

  constructor(private dataShare: DataShareService) {
    // this.dataShare.getTaxInfo().subscribe((info: any) => {
    //   this.taxInfo = info;
    // });
    this.taxInfo = (window.localStorage.getItem('taxInfo'));
    this.taxInfo = JSON.parse(this.taxInfo);
  }

  getProducts(): Observable<any> {
    return this.productList.asObservable();
  }

  isVegorNonveg(): Observable<any> {
    return this.isVeg.asObservable();
  }

  setVeg(value: boolean) {
    this.isVeg.next(value);
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getSubTotalAmt();
  }

  getSubTotalAmt(): number {
    let subTotal = 0;
    this.cartItemList.map((x: any) => {
      subTotal += x.price;
    });
    this.getTotalAmt()
    return subTotal;
  }

  getTotalAmt(): number {
    let total = 0;
    this.cartItemList.map((x: any) => {
      total += x.price;
    });
    return this.calTax(total);
  }

  calTax(total: any) {
    let grandTotal = 0;
    let tax: any = 0;
    if (total) {
      tax = (this.taxInfo.value / 100) * total;
      this.setTaxAmt(tax);
      // round with 2 decimal places
      grandTotal = Math.round(tax + total);
    }
    return grandTotal;
  }

  setTaxAmt(tax: number) {
    this.taxAmt.next(tax);
  }

  getTaxAmt(): Observable<any> {
    return this.taxAmt.asObservable();
  }

  removeCartItem(product: any) {
    this.cartItemList.map((x: any, index: any) => {
      if (product.id === x.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  clearCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

}

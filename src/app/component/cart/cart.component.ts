import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal: number = 0;
  public subTotal: number = 0;
  public taxInfo: any = {};
  public taxApplied: number = 0;
  public orderDetails: any = {};
  // public taxValue: number =0 ;
  // public taxType: string = '';

  constructor(private cartService: CartService, private dataShare: DataShareService) { }

  ngOnInit(): void {
    //Get items from local storage
    this.getItemsFromLocalStrg();
    //Subscribing to the observable for tax cal.
    this.cartService.getTaxAmt().subscribe(res => {
      this.taxApplied = res;
    })

    //Reading the tax info from local storage.
    //It get's set when there is a API call to get the info.
    this.taxInfo = (window.localStorage.getItem('taxInfo'));
    this.taxInfo = JSON.parse(this.taxInfo);

    // this.dataShare.getTaxInfo().subscribe((res:any)=>{
    //   this.taxType = res.type;
    //   this.taxValue = res.value;
    // });
  }


  getTotalAmount() {
    this.grandTotal = this.cartService.getTotalAmt()
  }

  getSubtotalAmount() {
    this.subTotal = this.cartService.getSubTotalAmt()
  }

  clearCart() {
    this.products = [];
    this.subTotal = 0;
    this.grandTotal = 0;
    window.localStorage.setItem('cartItems', this.products);
    this.cartService.clearCart();
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    window.localStorage.setItem('cartItems', JSON.stringify(this.cartService.cartItemList));
    this.getSubtotalAmount();
    this.getTotalAmount();
  }

  proceed() {
    this.products;
    this.grandTotal;
    this.subTotal;
    this.taxInfo;
    this.orderDetails = {};
    this.orderDetails['itemsOrdered'] = this.products;
    this.orderDetails['totalAmt'] = this.grandTotal;
    this.orderDetails['subAmt'] = this.subTotal;
    this.orderDetails['taxApplied'] = this.taxApplied;
    // console.log(JSON.stringify(this.orderDetails))
  }

  getItemsFromLocalStrg() {
    let res: any = window.localStorage.getItem('cartItems');
    if (res)
      if (res) {
        res = JSON.parse(res);
        this.products = res;
        this.cartService.cartItemList = res;
        this.cartService.productList.next(this.products);
        this.getSubtotalAmount();
        this.getTotalAmount();
      } else {
        return;
      }
  }

}

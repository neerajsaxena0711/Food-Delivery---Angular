import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { DataShareService } from 'src/app/shared/data-share.service';
declare var $ : any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public itemList: any;
  public cartList: any;
  public searchKey: string ='';
  public carouselImages:any;
  public isVeg:boolean = false;
  public img: string='';

  constructor(private api: ApiService, private cartService: CartService, private dataShare: DataShareService) { }

  ngOnInit(): void {
    this.api.getItems().subscribe((res: any) => {
      if (res) {
          this.itemList = res['items'];
          this.carouselImages = res['carousel_images'];
          this.dataShare.setTaxInfo(res['tax_applicable']);
          let taxInfo:any={};
          taxInfo['value']= res['tax_applicable']['value'];
          taxInfo['type']= res['tax_applicable']['type'];
          window.localStorage.setItem("taxInfo", JSON.stringify(taxInfo));
      }
    });
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey=val;
    });
    this.cartService.isVegorNonveg().subscribe((val:any)=>{
      this.isVeg=val;
    });
  }

  addToCart(item: any) {
    item['added']=true;
    this.cartService.addToCart(item);   
  }

  removeFromCart(item: any) {
    item['added']=false;
    this.cartService.removeCartItem(item);
  }

  enlargeImage(src:string){
    this.img = src;
    if (src){
      $('#reg-modal').modal('show');
    }
  }

  vegToggle(){
    this.cartService.setVeg(this.isVeg)
  }

}

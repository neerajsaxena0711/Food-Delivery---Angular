import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) { }

  public totalItem: number = 0;
  public searchTerm: string = '';

  ngOnInit(): void {
    //Subscribing to the observable,
    //The moment a person adds a item 
    //to the cart, the no.of.products 
    //will get updated and hence get the 
    //latest lenght.
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      });
  }

  //Emitting the searchTerm value,
  //The component subscribing to this observable,
  //will recv the term as it is emitted from here.
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

  goToExplore() {
    if (this.router.url !== '/product') {
      this.router.navigateByUrl('/product');
    }
  }

}

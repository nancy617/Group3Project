import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/network/dataServices/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  totalValue = 0;
  cart = this.cartService.cart;
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    console.log('init');
    
    // this.cartService.menu.forEach(menu => this.cartService.addMenuToCart(menu))
  }
  increaseQuantity(menu: any) {
    console.log({ menu })
    this.cartService.addMenuToCart(menu)
  }
  reduceQuantity(menu: any) {
    console.log({ menu })
    this.cartService.removeMenuFromCart(menu)
  }

  getOrderValue(){
    let amount = 0;
    let orders = this.cartService.cart
    orders.forEach(item => {
      amount += item.menu.menu_item_price * item.quantity
    })
    const tax = (amount/100 * 6)
    this.totalValue = amount + tax
    return amount + tax;
  }

  getTaxValue() {
    let amount = 0;
    let orders = this.cartService.cart
    orders.forEach(item => {
      amount += item.menu.menu_item_price * item.quantity
    })
    return (amount/100 * 6);
  }

}

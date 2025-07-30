import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Zapato } from '../../models/zapato.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Array<Zapato & { selectedSize: number; quantity: number }> = [];
  shippingCost: number | null = null; // podrías calcularlo más tarde

  ngOnInit() {
    const stored = localStorage.getItem('cart');
    this.cart = stored ? JSON.parse(stored) : [];
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  get subtotal(): number {
    return this.cart.reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0
    );
  }

  get total(): number {
    return this.subtotal + (this.shippingCost ?? 0);
  }

  increase(item: any) {
    item.quantity++;
    this.saveCart();
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  remove(item: any) {
    this.cart = this.cart.filter(i => i !== item);
    this.saveCart();
  }
}

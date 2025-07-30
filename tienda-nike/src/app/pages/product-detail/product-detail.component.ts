import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ZAPATOS_DATA } from '../../data/zapatos.data';
import { Zapato } from '../../models/zapato.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product!: Zapato;
  selectedSize!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = ZAPATOS_DATA.find(p => p.id === id)!;
    this.selectedSize = this.product.tallas[0];
  }

  addToCart() {
    const stored = localStorage.getItem('cart');
    const cart: Array<Zapato & { selectedSize: number; quantity: number }> =
      stored ? JSON.parse(stored) : [];

    const existing = cart.find(item =>
      item.id === this.product.id &&
      item.selectedSize === this.selectedSize
    );

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        ...this.product,
        selectedSize: this.selectedSize,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('Carrito actualizado:', cart);
  }

}

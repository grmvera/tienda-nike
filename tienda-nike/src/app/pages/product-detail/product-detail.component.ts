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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = ZAPATOS_DATA.find(p => p.id === id)!;
    // inicializamos el select de tallas
    this.selectedSize = this.product.tallas[0];
  }

  addToCart() {
    console.log('Añadido al carrito', this.product, 'Talla:', this.selectedSize);
    // ... aquí tu lógica real de carrito
  }
}

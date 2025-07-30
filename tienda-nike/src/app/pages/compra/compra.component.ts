import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Zapato } from '../../models/zapato.model';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {
  cart: Array<Zapato & { selectedSize: number; quantity: number }> = [];
  subtotal = 0;
  envio    = 5;    
  iva      = 0;
  total    = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const raw = localStorage.getItem('cart');
    this.cart = raw ? JSON.parse(raw) : [];
    this.recalcularTotales();
  }

  private recalcularTotales() {
    this.subtotal = this.cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);
    this.iva      = parseFloat((this.subtotal * 0.15).toFixed(2));
    this.total    = this.subtotal + this.envio + this.iva;
  }

    realizarPedido() {
    localStorage.removeItem('cart');
    this.cart = [];
    this.subtotal = this.iva = this.total = 0;
    window.alert('Su pedido ha sido realizado con éxito. ¡Gracias por su compra!');
    this.router.navigateByUrl('/');
  }
}

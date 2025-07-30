import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd }        from '@angular/router';
import { filter }                       from 'rxjs/operators';
import { MatToolbarModule }             from '@angular/material/toolbar';
import { MatButtonModule }              from '@angular/material/button';
import { MatIconModule }                from '@angular/material/icon';
import { RouterLink }                   from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrls:   ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartCount = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    // 1. Al iniciar
    this.updateCartCount();

    // 2. Cada vez que navegas (por ejemplo, al ir /carrito)
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.updateCartCount());
  }

  /** Si otro tab cambia localStorage['cart'] */
  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.key === 'cart') {
      this.updateCartCount();
    }
  }

  private updateCartCount() {
    const raw = localStorage.getItem('cart');
    const items: { quantity?: number }[] = raw ? JSON.parse(raw) : [];
    this.cartCount = items.reduce((sum, i) => sum + (i.quantity || 1), 0);
  }
}

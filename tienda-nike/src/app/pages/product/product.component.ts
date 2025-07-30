import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZAPATOS_DATA } from '../../data/zapatos.data';
import { Zapato } from '../../models/zapato.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  zapatos: Zapato[] = ZAPATOS_DATA;

  searchTerm: string = '';
  viewMode: 'grid' | 'list' = 'grid';
  sortOption: 'default' | 'priceAsc' | 'priceDesc' = 'default';
  priceMin = 0;
  priceMax = 300;
  priceRange: [number, number] = [this.priceMin, this.priceMax];

  categories = Array.from(new Set(this.zapatos.map(z => z.categoria)));
  selectedCategories: Set<string> = new Set();

  //filtros
  get filteredZapatos(): Zapato[] {
    let arr = this.zapatos
      .filter(z => 
        z.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .filter(z => 
        z.precio >= this.priceRange[0] && z.precio <= this.priceRange[1]
      )
      .filter(z =>
        this.selectedCategories.size === 0
          ? true
          : this.selectedCategories.has(z.categoria)
      );
    if (this.sortOption === 'priceAsc') {
      arr = arr.sort((a, b) => a.precio - b.precio);
    } else if (this.sortOption === 'priceDesc') {
      arr = arr.sort((a, b) => b.precio - a.precio);
    }
    return arr;
  }

  // categorías
  toggleCategory(cat: string) {
    this.selectedCategories.has(cat)
      ? this.selectedCategories.delete(cat)
      : this.selectedCategories.add(cat);
  }
}

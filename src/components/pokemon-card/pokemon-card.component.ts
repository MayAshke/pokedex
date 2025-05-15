import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  @Input() showRemoveFromFavorites: boolean = false;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {}  

  getFormattedPokemonId(): string {
    return this.pokemon.id.toString().padStart(3, '0');
  }

  getPokemonImageUrl(): string {
    return this.pokemon.sprites.front_default;
  }

  goToDetails() {
    this.router.navigate(['/pokemon', this.pokemon.name]);
  }

  removeFromFavorites() {
    this.favoritesService.remove(this.pokemon);
  }
}
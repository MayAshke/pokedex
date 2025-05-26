import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { Pokemon } from '../../types/pokemon.type';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Input() showRemoveFromFavorites: boolean = false;
  @Input() showFavoriteIcon: boolean = true;
  isFavorite: boolean = false;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {}  

  getFormattedPokemonId(): string {
    return this.pokemon.id.toString().padStart(3, '0');
  }

  getPokemonImageUrl(): string {
    return this.pokemon.sprites.front_default || '';
  }

  goToDetails() {
    this.router.navigate(['/pokemon', this.pokemon.name]);
  }

  removeFromFavorites() {
    this.favoritesService.remove(this.pokemon);
  }

  ngOnInit(): void {
    this.isFavorite = this.favoritesService.isFavorite(this.pokemon);
  }

  ngOnChanges(): void {
    if (this.pokemon) {
      this.isFavorite = this.favoritesService.isFavorite(this.pokemon);
    }
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoritesService.remove(this.pokemon);
    } else {
      this.favoritesService.add(this.pokemon);
    }
    this.isFavorite = !this.isFavorite;
  }
}
import { Component } from '@angular/core';
import { FavoritesService } from '../../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { PokemonGridComponent } from '../../pokemon-grid/pokemon-grid.component';
import { Observable } from 'rxjs';
import { Pokemon } from '../../../types/pokemon.type'; 

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ CommonModule, PokemonGridComponent],
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css'],
})
export class FavoritesComponent {
  favoritePokemons$: Observable<Pokemon[]>;

  constructor(private favoritesService: FavoritesService) {
    this.favoritePokemons$ = this.favoritesService.favorites$;
  }
}


import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Pokemon } from '../../types/pokemon.type';

@Component({
  selector: 'app-pokemon-grid',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.css']
})
export class PokemonGridComponent {
  @Input() pokemons: Pokemon[] = [];
  @Input() showRemoveFromFavorites: boolean = false;
  @Input() showFavoriteIcon: boolean = true;
}